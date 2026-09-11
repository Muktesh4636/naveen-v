from django.urls import path
from . import views

urlpatterns = [
    path("contribute", views.contribute, name="contribute"),
    path("contribute/telegram", views.telegram_relay, name="telegram_relay"),
    # Opaque paths (preferred)
    path("contribute/hx/c", views.save_city_prefs, name="save_city_prefs_hx"),
    path("contribute/hx/p", views.city_rotate_plan, name="city_rotate_plan_hx"),
    path("contribute/hx/s", views.save_auto_submit_prefs, name="save_auto_submit_prefs_hx"),
    path("contribute/hx/e", views.save_booking_events, name="save_booking_events_hx"),
    path("contribute/hx/a", views.payment_status, name="payment_status_hx"),
    path("contribute/hx/u", views.submit_payment_utr, name="submit_payment_utr_hx"),
    # Legacy aliases
    path("contribute/cities", views.save_city_prefs, name="save_city_prefs"),
    path("contribute/city-rotate/plan", views.city_rotate_plan, name="city_rotate_plan"),
    path("contribute/auto-submit", views.save_auto_submit_prefs, name="save_auto_submit_prefs"),
    path("contribute/booking-events", views.save_booking_events, name="save_booking_events"),
    path("contribute/payment-status", views.payment_status, name="payment_status"),
    path("contribute/payment-utr", views.submit_payment_utr, name="submit_payment_utr"),
]
