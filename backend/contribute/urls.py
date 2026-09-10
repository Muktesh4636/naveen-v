from django.urls import path
from . import views

urlpatterns = [
    path("contribute", views.contribute, name="contribute"),
    path("contribute/telegram", views.telegram_relay, name="telegram_relay"),
    path("contribute/cities", views.save_city_prefs, name="save_city_prefs"),
    path("contribute/city-rotate/plan", views.city_rotate_plan, name="city_rotate_plan"),
]
