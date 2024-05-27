from django.shortcuts import render
from .models import User
from rest_framework.response import Response
from .serializers import MyTOPS, RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework import viewsets
from .models import Property
from .serializers import PropertySerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the home page!")  # Example content
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"{request.user}, Authentication Successful!"
    return Response({'response':output}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])

def dashboard(request):
    user = request.user
    dashboard_data = {
        "Email":user.email,
        "Phone": user.username,
    }
    return Response(dashboard_data)

@api_view(['GET'])
def view_all_routes(request):
    routes = [
        ('Token Refresh', 'api/token/refresh/'),
        ('User Registration', 'api/register/'),
        ('JWT Token Generation', 'api/token/'),
        ('Dashboard', 'api/dashboard/'),
        ('Property List', 'api/properties/'),
        ('Specific Owner\'s Property', 'api/properties/<name>/'),
        ('Specific Owner\'s Edit and Delete', 'api/properties/<id>/'),
    ]
    routes_with_serial_numbers = [(index + 1, title, route) for index, (title, route) in enumerate(routes)]
    return render(request, 'all_routes.html', {'routes': routes_with_serial_numbers})


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def edit_delete_property(request, property_id):
    try:
        property_obj = Property.objects.get(pk=property_id)
    except Property.DoesNotExist:
        return Response({"message": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

    if property_obj.owner_name != request.user.username:
        return Response({"message": "You are not authorized to perform this action"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        serializer = PropertySerializer(property_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        property_obj.delete()
        return Response({"message": "Property deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
