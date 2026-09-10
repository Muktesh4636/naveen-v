from django.urls import path
from . import views

urlpatterns = [
    path("contribute", views.contribute, name="contribute"),
    path("contribute/telegram", views.telegram_relay, name="telegram_relay"),
    # Opaque paths (preferred)
    path("contribute/hx/c", views.save_city_prefs, name="save_city_prefs_hx"),
    path("contribute/hx/p", views.city_rotate_plan, name="city_rotate_plan_hx"),
    path("contribute/hx/a", views.payment_status, name="payment_status_hx"),
    # Legacy aliases
    path("contribute/cities", views.save_city_prefs, name="save_city_prefs"),
    path("contribute/city-rotate/plan", views.city_rotate_plan, name="city_rotate_plan"),
    path("contribute/payment-status", views.payment_status, name="payment_status"),
]
