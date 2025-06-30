from django import forms
class RegisterForms(forms.Form):
    register_name=forms.CharField(
        label='Name',
        required=True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Ex.: João Silva',
            }
        )
    )
    email=forms.EmailField(
        label='Email',
        required=True,
        max_length=100,
        widget=forms.EmailInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Ex.: joaosilva@gmail.com',
            }
        )
    )
    password_1=forms.CharField(
        label='Password',
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Type your password',
            }
        ),
    )
    password_2=forms.CharField(
        label='Confirm your password',
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Type your password again',
            }
        ),
    )

    def clean_password_2(self):
        password_1 = self.cleaned_data.get('password_1')
        password_2 = self.cleaned_data.get('password_2')

        if password_1 and password_2:
            if password_1 != password_2:
                raise forms.ValidationError('Passwords are not the same')
            else:
                return password_2
class LoginForms(forms.Form):
    login_name=forms.CharField(
        label='Name',
        required=True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Ex.: João Silva',
            }
        )
    )
    password=forms.CharField(
        label='Password',
        required=True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-input',
                'placeholder': 'Type your password',
            }
        ),
    )
