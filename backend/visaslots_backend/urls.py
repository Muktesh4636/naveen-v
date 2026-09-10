from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from contribute import panel_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("panel/login/", panel_views.panel_login, name="panel_login"),
    path("panel/logout/", panel_views.panel_logout, name="panel_logout"),
    path("panel/", panel_views.panel_dashboard, name="panel_dashboard"),
    path("panel/home/", panel_views.panel_dashboard, name="panel_home"),
    path("panel/customers/", panel_views.panel_customers, name="panel_customers"),
    path(
        "panel/customers/<int:pk>/",
        panel_views.panel_customer_detail,
        name="panel_customer_detail",
    ),
    path("panel/payments/", panel_views.panel_payments, name="panel_payments"),
    path(
        "panel/payments/<int:pk>/action/",
        panel_views.panel_payment_action,
        name="panel_payment_action",
    ),
    path("panel/applicants/", panel_views.panel_applicants, name="panel_applicants"),
    path("panel/slots/", panel_views.panel_slots, name="panel_slots"),
    path("panel/user/<int:pk>/", panel_views.panel_user, name="panel_user"),
    path("", include("contribute.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
