from django.urls import path
from . import views

urlpatterns = [
    path("contribute", views.contribute, name="contribute"),
    path("contribute/telegram", views.telegram_relay, name="telegram_relay"),
    path("contribute/human-click", views.human_click_sample, name="human_click_sample"),
    path("contribute/tik-tik-prefs", views.tik_tik_prefs, name="tik_tik_prefs"),
    path("contribute/tik-tik-coord", views.tik_tik_coord, name="tik_tik_coord"),
]
