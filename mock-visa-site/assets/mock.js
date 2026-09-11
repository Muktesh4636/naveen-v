/**
 * Mock OFC page logic — jQuery Ajax shaped like CGI so Visa Slot 8 can intercept.
 */
(function ($) {
  "use strict";

  var DAYS_URL =
    "/Appointment/Ajax?route=/api/v1/get-family-ofc-schedule-days";
  var ENTRIES_URL =
    "/Appointment/Ajax?route=/api/v1/get-family-ofc-schedule-entries";

  var availableDates = {}; // "YYYY-M-D" (jQuery UI beforeShowDay key) -> true
  var selectedDateISO = null;
  var loadSeq = 0;

  function setStatus(text) {
    $("#mock-status").text(text || "");
  }

  function setLoading(on) {
    $("#loading-indicator").toggleClass("hidden", !on);
  }

  function resetBookingUi() {
    selectedDateISO = null;
    availableDates = {};
    $("#datepicker").val("").prop("disabled", true);
    if ($("#datepicker").hasClass("hasDatepicker")) {
      try {
        $("#datepicker").datepicker("option", "beforeShowDay", function () {
          return [false, "", ""];
        });
      } catch (e) {}
    }
    $("#times-wrap").addClass("hidden");
    $("#times-body").empty();
    $("#submitbtn").prop("disabled", true);
    $("#submit-result").removeClass("ok err").text("");
  }

  function isoFromYmd(y, m0, d) {
    return (
      y +
      "-" +
      String(m0 + 1).padStart(2, "0") +
      "-" +
      String(d).padStart(2, "0")
    );
  }

  function markAvailableDays(scheduleDays) {
    availableDates = {};
    (scheduleDays || []).forEach(function (day) {
      var iso = String(day.Date || "").slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return;
      var parts = iso.split("-").map(Number);
      var key = parts[0] + "-" + (parts[1] - 1) + "-" + parts[2];
      availableDates[key] = true;
    });
  }

  function beforeShowDay(date) {
    var key =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    if (availableDates[key]) return [true, "mock-avail", "Available"];
    return [false, "", ""];
  }

  function ensureDatepicker() {
    var $dp = $("#datepicker");
    if ($dp.hasClass("hasDatepicker") && $dp.data("datepicker")) {
      $dp.datepicker("option", "beforeShowDay", beforeShowDay);
      return;
    }
    $dp.datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true,
      beforeShowDay: beforeShowDay,
      onSelect: function (dateText) {
        selectedDateISO = dateText;
        loadEntries(dateText);
      },
    });
  }

  function loadDays(postId) {
    var seq = ++loadSeq;
    resetBookingUi();
    if (!postId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setStatus("Loading days for " + postId.slice(0, 8) + "…");

    $.ajax({
      url: DAYS_URL,
      method: "POST",
      data: {
        parameters: JSON.stringify({ postId: postId }),
      },
      dataType: "json",
    })
      .done(function (resp) {
        if (seq !== loadSeq) return;
        setLoading(false);

        if (resp && resp._mockAlert) {
          window.alert(resp._mockAlert);
        }

        if (resp && resp.HasError) {
          setStatus("HasError — " + (resp.ErrorString || "error"));
          $("#datepicker").prop("disabled", true);
          return;
        }

        var days = (resp && resp.ScheduleDays) || [];
        markAvailableDays(days);
        ensureDatepicker();

        if (!days.length) {
          setStatus("No slots for this city");
          $("#datepicker").prop("disabled", true);
          return;
        }

        $("#datepicker").prop("disabled", false);
        setStatus(days.length + " day(s) available — open datepicker");
        // Nudge calendar open so extension date pick can find cells
        try {
          $("#datepicker").datepicker("refresh");
        } catch (e) {}
      })
      .fail(function (xhr) {
        if (seq !== loadSeq) return;
        setLoading(false);
        setStatus("Ajax failed: " + xhr.status);
      });
  }

  function loadEntries(dateISO) {
    $("#times-wrap").removeClass("hidden");
    $("#times-body").html(
      '<tr><td colspan="3">Loading times…</td></tr>'
    );
    $("#submitbtn").prop("disabled", true);

    $.ajax({
      url: ENTRIES_URL,
      method: "POST",
      data: {
        parameters: JSON.stringify({ Date: dateISO }),
      },
      dataType: "json",
    })
      .done(function (resp) {
        var entries = (resp && resp.ScheduleEntries) || [];
        var $body = $("#times-body").empty();
        if (!entries.length) {
          $body.append("<tr><td colspan='3'>No times</td></tr>");
          return;
        }
        entries.forEach(function (e, i) {
          var time = e.Time || "";
          var avail = e.EntriesAvailable != null ? e.EntriesAvailable : "";
          var id = "slot_" + i;
          var $tr = $(
            "<tr>" +
              '<td><input type="radio" name="slot" id="' +
              id +
              '" value="' +
              time +
              '" /></td>' +
              "<td><label for='" +
              id +
              "'>" +
              time +
              "</label></td>" +
              "<td>" +
              avail +
              "</td>" +
              "</tr>"
          );
          $tr.on("click", function (ev) {
            if (ev.target && ev.target.tagName === "INPUT") return;
            var $r = $tr.find('input[type="radio"]');
            $r.prop("checked", true).trigger("change");
          });
          $body.append($tr);
        });

        $body.find('input[type="radio"]').on("change", function () {
          $("#submitbtn").prop("disabled", false);
        });
        setStatus("Times loaded for " + dateISO);
      })
      .fail(function () {
        $("#times-body").html("<tr><td colspan='3'>Failed to load times</td></tr>");
      });
  }

  function applyConfig(cb) {
    var scenario = $("#mock-scenario").val();
    var delayMs = Number($("#mock-delay").val()) || 0;
    $.ajax({
      url: "/mock/config",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ scenario: scenario, delayMs: delayMs }),
      dataType: "json",
    })
      .done(function (cfg) {
        setStatus(
          "Config: " + cfg.scenario + " / " + cfg.delayMs + "ms"
        );
        if (typeof cb === "function") cb();
      })
      .fail(function () {
        setStatus("Failed to save mock config");
      });
  }

  function syncControlsFromServer() {
    $.getJSON("/mock/config")
      .done(function (cfg) {
        $("#mock-scenario").val(cfg.scenario || "slots");
        $("#mock-delay").val(cfg.delayMs != null ? cfg.delayMs : 1500);
      })
      .fail(function () {});
  }

  $(function () {
    ensureDatepicker();
    syncControlsFromServer();

    // Query string overrides: ?delay=3000&scenario=empty
    try {
      var q = new URLSearchParams(location.search);
      if (q.has("delay")) $("#mock-delay").val(q.get("delay"));
      if (q.has("scenario")) $("#mock-scenario").val(q.get("scenario"));
      if (q.has("delay") || q.has("scenario")) {
        applyConfig(function () {});
      }
    } catch (e) {}

    $("#post_select").on("change", function () {
      loadDays(String($(this).val() || ""));
    });

    $("#mock-apply").on("click", function () {
      applyConfig(function () {
        var postId = String($("#post_select").val() || "");
        if (postId) loadDays(postId);
      });
    });

    $("#mock-reload-city").on("click", function () {
      var postId = String($("#post_select").val() || "");
      if (!postId) {
        setStatus("Pick a city first");
        return;
      }
      applyConfig(function () {
        loadDays(postId);
      });
    });

    $("#submitbtn").on("click", function () {
      var time = $('input[name="slot"]:checked').val();
      if (!selectedDateISO || !time) {
        $("#submit-result")
          .removeClass("ok")
          .addClass("err")
          .text("Pick date and time first.");
        return;
      }
      $("#submit-result")
        .removeClass("err")
        .addClass("ok")
        .text(
          "Submitted (mock): " + selectedDateISO + " @ " + time
        );
      // Navigate-ish confirmation stub so submit watchers see a result
      document.title = "Appointment Confirmation — Mock";
    });

    // Default city so Tik Tik / city rotate have something to work with
    var $sel = $("#post_select");
    if (!$sel.val()) {
      $sel.val("3f6bf614-b0db-ec11-a7b4-001dd80234f6").trigger("change");
    }
  });
})(window.jQuery);
