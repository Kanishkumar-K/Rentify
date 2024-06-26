from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', views.home, name='home'),  # Define a URL pattern for the home page
    path('token/', views.MyTokenObtainPairView.as_view(), name="token-obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('register/', views.RegisterView.as_view(), name="register-user"),
    path('test/', views.protectedView, name="test"),
    path('dashboard/', views.dashboard, name="dashboard"),  # Logged in
    path('properties/<int:property_id>/', views.edit_delete_property, name="edit-delete-property"),
    path('api/', include(router.urls)),  # Include router URLs under 'api/' prefix
    path('all-routes/', views.view_all_routes, name="all-routes"),  # Moved this pattern to a different URL
]
