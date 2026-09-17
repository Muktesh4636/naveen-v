from django.urls import path
from . import views

urlpatterns = [
    path("contribute", views.contribute, name="contribute"),
    path("contribute/telegram", views.telegram_relay, name="telegram_relay"),
    path("contribute/human-click", views.human_click_sample, name="human_click_sample"),
]
