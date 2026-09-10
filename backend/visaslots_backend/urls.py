from django.contrib import admin
from django.urls import path, include
from contribute import panel_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("panel/login/", panel_views.panel_login, name="panel_login"),
    path("panel/logout/", panel_views.panel_logout, name="panel_logout"),
    path("panel/", panel_views.panel_home, name="panel_home"),
    path("panel/user/<int:pk>/", panel_views.panel_user, name="panel_user"),
    path("", include("contribute.urls")),
]
