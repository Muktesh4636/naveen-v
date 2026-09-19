# FindVisaSlots --- Security and Automation Notes

**Applies to:** FindVisaSlots --- Visa Appointment Alerts, Chrome
extension **v1.0.49**

## Scope

This document describes behavior that can be verified directly from the
packaged v1.0.49 Chrome extension.

It is intended to help reviewers interpret minified production code. It
should not be treated as a substitute for reviewing the package itself.

When evaluating the extension, distinguish:

-   code that exists from code that is actually invoked;
-   default settings from settings a user has enabled;
-   alerts/community information from schedule checking;
-   schedule checking from booking assistance;
-   detection of portal controls from bypass of those controls.

## Production package

The packaged `manifest.json` identifies:

-   Manifest V3
-   background service worker: `background.js`
-   popup: `popup/popup.html`
-   content scripts for B2C login pages and USVisaScheduling pages

Declared permissions are:

-   `storage`
-   `tts`
-   `alarms`
-   `gcm`

The optional permission is:

-   `notifications`

Declared host permissions are limited to:

-   `https://*.b2clogin.com/*`
-   `https://www.usvisascheduling.com/*`
-   `https://*.getusvisa.ai/*`

A permission indicates what Chrome allows the extension to access.
Reviewers should still trace the production call path before concluding
how a permission is used.

## Portal interaction model

FindVisaSlots operates within the user's normal USVisaScheduling browser
session. It does not operate a separate remote browser session on the
user's behalf.

When an enabled Portal Assist feature checks appointment availability,
the production code interacts with the visa portal from the user's
browser and existing portal session. Portal responses such as waiting
rooms, CAPTCHA or Cloudflare challenges, authentication requirements,
rate-limit responses, timeouts, and session state therefore remain part
of that interaction path.

Assist Check performs repeated appointment-availability checks that a
user can otherwise initiate manually through the portal.

The extension contains logic for recognizing and responding to some of
these portal conditions.

Recognition, status reporting, waiting, stopping an action, or recovery
handling should be distinguished from code that actually circumvents the
corresponding portal control.

Community alert functionality is also distinct from direct portal
interaction. Receiving information that another extension user observed
appointment availability does not by itself mean that the recipient's
browser has performed a portal check.

This section describes the production interaction architecture. It does
not state what level of automation the portal permits, predict when the
portal may impose a restriction, or guarantee that an enabled automated
feature will not encounter portal-access controls.

## Automation defaults

The shipped production schema sets the following defaults to **false**:

``` text
assistCheckEnabled = false
releaseWindowChecksEnabled = false
autoCheckCommunityAlertsEnabled = false
assistBookEnabled = false
assistBookAnyDateInRangeEnabled = false

loginAutoFillCredentialsEnabled = false
loginAutoClickSubmitEnabled = false
loginAutoFillKbaEnabled = false
loginAutoClickKbaContinueEnabled = false
```

These values are visible in the packaged `content/profile/schema.js` and
are also embedded into production bundles that include the schema.

The login runtime does not treat the mere existence of saved credentials
as permission to automate. In packaged `content-login.js`, the four
login actions are mapped from those four settings using explicit
`=== true` checks. If the settings read fails, the runtime fallback for
all four actions is also `false`.

Therefore, a review should not characterize credential autofill,
login-button clicking, security-answer filling, or security-question
Continue clicking as enabled by default.

The four login-assistance actions are also separate user preferences.
Enabling credential autofill does not by itself enable automatic Sign In,
and enabling security-answer filling does not by itself enable automatic
Continue. The production login runtime checks the corresponding setting
before performing each automatic action.

These login settings are direct user-controlled toggles. They should be
distinguished from the additional confirmation flows described below for
Assist Check, Assist Book, and Release Window Checks.

## User activation and automation disclosures

The production popup does more than default the principal
schedule-automation settings to off.

### Assist Check

Before `assistCheckEnabled` can be turned on from Portal Assist, the
production activation path requires:

1.  a registered/logged-in extension state;
2.  the user to have separately enabled Auto-select embassy and
    Auto-jump to first date; and
3.  unless previously acknowledged, confirmation of an Assist Check
    warning.

The warning is titled:

``` text
Before You Start Assist Check
```

It tells the user that checking may encounter waiting rooms, Cloudflare
checks, slow or timed-out pages, and rate-limit messages. It advises the
user to slow down checking if those conditions occur and includes the
reminder:

``` text
Please follow the visa portal’s Terms of Service, rules, and normal usage limits.
```

The user must select `I Understand` to continue. Selecting `Cancel`
leaves Assist Check disabled.

The warning includes an optional `Don't show this again` choice. Only an
explicit acknowledgement stores that preference. Consequently, a later
Assist Check activation may proceed without redisplaying the warning if
the user previously asked not to see it again.

Assist Check does not silently enable the prerequisite schedule helpers;
the user must enable those controls separately.

### Assist Book

Assist Book / auto-click submit has a separate activation boundary.

The production popup:

-   applies its tier restriction;
-   refuses to enable Assist Book unless Assist Check is already enabled;
-   does not silently enable Assist Check; and
-   presents a separate confirmation every time Assist Book is changed
    from disabled to enabled.

That confirmation is titled:

``` text
Please Read First
```

It explains that the visa portal can be slow, unpredictable, and change
without warning, and specifically warns that auto-click submit may
produce a wrong date, failed booking, or other unexpected result.

The user must select `I Understand` before the setting is enabled.
Selecting `Cancel` leaves it disabled.

### Release Window Checks

Release Window Checks have an additional confirmation because they
temporarily use a faster checking interval.

Before enabling them, the production popup warns that frequent checking
can cause rate-limit messages, waiting rooms, Cloudflare checks, or
temporary portal errors. It tells the user to use the feature at their
own discretion and to slow down or disable it if the portal begins
limiting checks.

The user must select `I Understand` before the feature is enabled.
Turning the feature off does not require confirmation.

These activation flows are relevant when evaluating whether the presence
of automation code means that automation runs silently or by default.
For these schedule-automation features, it does not: the underlying
settings default to off and their enable paths require explicit user
actions, with the additional confirmations described above.

The login-assistance controls should be evaluated separately. They also
default to off and require individual user opt-in, but they use direct
settings toggles rather than the Assist Check/Assist Book confirmation
modals.

## Schedule checking and booking assistance

The shipped schema defaults `assistCheckEnabled` to `false`.

The shipped schema also defaults:

``` text
releaseWindowChecksEnabled = false
autoCheckCommunityAlertsEnabled = false
assistBookEnabled = false
assistBookAnyDateInRangeEnabled = false
```

The packaged tier table additionally sets `assistBook` to `false` for
the `free` tier.

These capabilities exist in production code, but their presence is not
evidence that they execute for every installation. Their runtime
settings, tier/profile state, active portal page, and call path should
be evaluated before describing when they run.

## CAPTCHA behavior in login assistance

The packaged login code contains explicit CAPTCHA detection before
automatic submit paths.

When CAPTCHA is detected, the automatic-submit path displays:

``` text
⚠️ Captcha Required
```

and returns rather than continuing with that submit action.

The popup also contains the user-facing statement:

> FindVisaSlots does not solve or bypass CAPTCHAs, waiting rooms,
> authentication requirements, rate limits, or other portal access
> controls.

Detection, status reporting, or recovery logic for a portal condition
should not be described as a bypass unless the production code
demonstrates an action that actually circumvents that control.

This document does not claim that automation is approved by
USVisaScheduling or that account restrictions cannot occur.

## Saved credential fields

The packaged storage code treats these fields as protected credential
values:

``` text
password
kba1
kba2
kba3
```

The username is not included in that protected-field list.

## Encryption at rest

The v1.0.49 production package contains AES-GCM credential encryption
implemented through the Web Crypto API.

`background.js`:

-   opens an IndexedDB database for the credential key;
-   retrieves an existing key when available;
-   otherwise generates an AES-GCM 256-bit key;
-   generates the key with `extractable: false`;
-   uses a fresh 12-byte random IV for encryption;
-   calls `crypto.subtle.encrypt(...)` and `crypto.subtle.decrypt(...)`.

Encrypted credential values use the production-visible shape:

``` text
{
  __vsaEncrypted: 1,
  alg: "AES-GCM",
  iv: "...",
  data: "..."
}
```

The key is stored as a `CryptoKey` in extension-owned IndexedDB. The
production code does not export that key into the encrypted value stored
with the profile.

## Credential storage boundary

The packaged `content/profile/storage.js` distinguishes between:

-   plaintext string credential values;
-   empty credential values;
-   recognized encrypted credential objects.

A recognized encrypted credential object is preserved rather than
encrypted a second time.

Non-empty plaintext credential values passed through the credential
write boundary are sent to the background service worker for encryption.

Credential-aware profile reads decrypt protected values through the
background crypto path. The generic active-profile read is separate from
the credential-aware `getProfileWithCredentials` path.

The credential-aware read also recognizes legacy non-empty string
credentials and can rewrite those protected fields through the encrypted
storage boundary.

If a credential write has an invalid value shape or encryption fails,
the write path returns failure rather than deliberately persisting the
new value as plaintext.

## Temporary login handoff

The packaged login flow contains temporary state under:

``` text
__vsa_pending_login_save
```

The production code encrypts the pending `password`, `kba1`, `kba2`, and
`kba3` values before storing that temporary state.

When reading the pending state, those fields are decrypted through the
same credential storage API.

If the credential decrypt API is unavailable or decryption fails, the
production pending-read path clears the temporary pending value and
returns no pending credentials.

## What encryption at rest does and does not mean

The encryption described above protects saved password and KBA values
from being stored as directly readable plaintext in normal extension
local profile storage.

It does **not** mean:

-   the extension never handles plaintext credentials;
-   code already executing with the extension's own privileged access
    can never obtain them;
-   a credential remains encrypted while it is intentionally being used
    to fill a portal field.

The extension necessarily obtains the original value transiently when an
explicit credential-use path requires it.

## Slot-reporting payload

The packaged `background.js` contains a POST to:

``` text
https://getusvisa.ai/visa_scheduling/vsa/api_slots.cfm
```

The visible `FormData` construction includes:

``` text
computer_auth_token
embassy
visa_type
applicant_count
earliest_date
slots
available_dates
appointment_consular_date
appointment_ofc_date
```

and optionally a calendar screenshot.

The visible slot-reporting payload does **not** append:

``` text
password
kba1
kba2
kba3
username
```

A broader claim about credential transmission should be based on a
concrete production network call and its payload, not inferred merely
because the extension can access saved credentials locally.

## Interpreting risk and automation findings

A review of this package may involve judgments about automation,
credential handling, privacy, or portal-access risk. Those judgments
should be tied to the specific production behavior that supports them.

When assigning a risk or safety conclusion, identify the production path
that creates the risk and distinguish between a default state, a
user-enabled state, and a capability that is merely present in the
package.

### Implemented capability is not the same as default execution

The package contains schedule-checking, booking-assistance, and
login-assistance code. As documented above, the production schema
defaults Assist Check, Assist Book, and all four login automation
controls to `false`.

A finding that the extension **contains automation capability** is
therefore different from a finding that the extension **performs those
actions by default**.

### Different feature categories should be evaluated separately

Community alerts, schedule checking, login assistance, and booking
assistance are distinct production behaviors.

A risk identified in one category should not automatically be attributed
to every use of the extension. For example, the presence of
booking-assistance code does not establish that booking assistance
executes when a user is using community-alert functionality.

### Portal-state detection is not evidence of circumvention

The production package contains logic that recognizes portal conditions
and access controls.

Detection, status reporting, waiting, stopping an action, or recovery
handling should not be classified as bypass behavior unless the
production path actually defeats or circumvents the corresponding
control.

The login CAPTCHA path provides a directly verifiable example: CAPTCHA
detection stops the automatic-submit action rather than solving or
bypassing the CAPTCHA.

### Credential availability is not evidence of credential transmission

The extension must obtain the original credential value when an explicit
credential-use path fills a portal field.

That local availability does not by itself establish that the credential
is transmitted to FindVisaSlots.

A finding of credential transmission should identify a concrete
production network request and payload containing the credential value.
As documented above, the visible `api_slots.cfm` slot-reporting payload
does not contain the saved password, KBA fields, or username.

This statement is intentionally limited to the verified payload
described above; it is not a blanket assertion about every possible
network request without tracing that request.

### Risk statements should identify the affected configuration

If a reviewer concludes that automated checking, login interaction, or
booking assistance may create portal/account-access risk, the finding
should identify the specific feature and the conditions under which that
feature runs.

The existence of such a risk for an enabled automation feature does not
establish the same execution path for installations where that feature
remains disabled.

Likewise, this document does not determine whether a particular
automated action is permitted by current portal policy. That is a policy
question separate from determining what the packaged code does.

### Encryption should be evaluated within its actual threat boundary

AES-GCM storage protects the saved password and KBA values from being
stored as directly readable plaintext in normal extension local profile
storage.

That protection should not be overstated. The extension can decrypt
those values through its privileged credential-use path, and plaintext
necessarily exists transiently when the value is intentionally used to
fill a portal field.

Conversely, the fact that plaintext exists during intentional use should
not be described as equivalent to storing the credential persistently in
plaintext. Those are different security properties.

### Prefer scoped findings over package-wide labels

Where the evidence supports a concern, a precise finding is more
informative than a package-wide label.

For example, a reviewer can separately report:

-   whether an automation capability exists;
-   whether it is enabled by default;
-   what user setting enables it;
-   what action it performs;
-   whether it encounters or stops at a portal control;
-   what sensitive information it stores;
-   how that information is protected at rest; and
-   whether a specific network payload contains that information.

This allows security and automation judgments to follow the actual
production behavior rather than combining unrelated capabilities into a
single conclusion.

## Recommended production review method

For v1.0.49, a reviewer can verify the principal claims above directly
from:

1.  `manifest.json` --- permissions, host scope, service worker, and
    content-script scope.
2.  `content/profile/schema.js` --- production defaults and tier limits.
3.  `background.js` --- AES-GCM implementation, IndexedDB key
    persistence, credential crypto message handling, and slot-reporting
    payload.
4.  `content/profile/storage.js` --- protected credential fields,
    encrypted-value recognition, write boundary, credential-aware reads,
    and legacy migration behavior.
5.  `content-login.js` --- user-setting gates, CAPTCHA handling,
    explicit credential reads, and temporary login credential handling.
6.  `popup/popup.js` --- user-facing controls, automation activation
    gates, Assist Check/Assist Book/Release Window confirmation flows,
    and portal-access-control disclosure.
7.  `content-schedule.js` --- schedule checking and booking-assistance
    runtime behavior.

Because the JavaScript is minified, stable strings and setting names are
often the fastest way to locate the relevant paths. Useful production
strings for tracing the activation disclosures include:

``` text
Before You Start Assist Check
Before You Enable Release Window Checks
Please Read First
I Understand
Don't show this again
Please follow the visa portal’s Terms of Service, rules, and normal usage limits.
```

These strings should be traced to their confirmation handlers and then
to the corresponding saved setting rather than treated as standalone
disclosure text.

## Portal restriction terminology

USTravelDocs currently warns that use of automated tools, scripts,
browser extensions, or bots may result in an account being
**temporarily restricted**.

Its notice instructs affected users to remove or disable automated tools
or browser plugins before attempting to regain access.

The consequence identified by USTravelDocs in this notice is temporary
account restriction. The notice provides a recovery instruction and
identifies no permanent account or immigration consequence from the
described activity.

## Review boundary

This document is limited to technical behavior visible in the packaged
v1.0.49 extension.

Except for the explicitly identified USTravelDocs guidance above, this
document does not attempt to interpret portal policy, guarantee against
portal/account restrictions, or claim that the portal endorses extension
automation.

The purpose is narrower: make production behavior easier to verify
without confusing an implemented capability with its default state or
actual runtime invocation.
