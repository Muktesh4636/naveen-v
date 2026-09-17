from django.urls import path

from . import panel_views

urlpatterns = [
    path("login/", panel_views.panel_login, name="panel_login"),
    path("logout/", panel_views.panel_logout, name="panel_logout"),
    path("", panel_views.panel_home, name="panel_home"),
    path("timings/", panel_views.panel_timings, name="panel_timings"),
    path("history/", panel_views.panel_history, name="panel_history"),
    path("users/", panel_views.panel_users, name="panel_users"),
]
