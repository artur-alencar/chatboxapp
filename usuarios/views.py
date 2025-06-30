from django.shortcuts import render, get_object_or_404, redirect
from usuarios.forms import RegisterForms, LoginForms
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from usuarios.models import Profile
@login_required(login_url='login')
def index(request):
    user = request.user
    profile, _ = Profile.objects.get_or_create(user=user)

    context = {
        'user': user,
        'profile': profile,
    }   
    if context['profile'].about == None:
        context['profile'].about = 'Write something that other people will see'
    return render(request, 'galeria/index.html', {'context': context})
def register(request):
    form = RegisterForms()
    if request.method == 'POST':
        form = RegisterForms(request.POST)
    if form.is_valid():
        name=form['register_name'].value()
        email=form['email'].value()
        password=form['password_1'].value()


        if User.objects.filter(username=name).exists():
            messages.error(request, 'This User already exists')
            return redirect('register')
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'This Email is already registered')
            return redirect('register')

        user = User.objects.create_user(
            username=name,
            email=email,
            password=password
        )
        user.save()

        Profile.objects.create(user=user)
        auth.login(request, user)

        return redirect('index')
    
    return render(request, 'galeria/register.html', {'form':form})
def login(request):
    form = LoginForms()

    if request.method == 'POST':
        form = LoginForms(request.POST)


        if form.is_valid():
            name = form['login_name'].value()
            password = form['password'].value()


        user = auth.authenticate(
            request,
            username=name,
            password=password
        )
        if user is not None:
            auth.login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
    return render(request, 'galeria/login.html', {'form':form})
def logout(request):
    auth.logout(request)
    return redirect('login')
def edit_username(request):
    if request.method == 'POST':
        new_username = request.POST.get('new_username')
        if new_username.replace(' ', ''):
            request.user.username = new_username
            request.user.save()
    return redirect('index')
def edit_about(request):
    if request.method == 'POST':
        new_about = request.POST.get('new_about')
        if new_about.replace(' ', ''):
            profile = Profile.objects.get(user=request.user)
            profile.about = new_about
            profile.save()
    return redirect('index')  
def edit_photo(request):
    if request.method == 'POST' and request.FILES.get('new_photo'):
        profile = Profile.objects.get(user=request.user)
        profile.picture = request.FILES['new_photo']
        profile.save()
    return redirect('index')