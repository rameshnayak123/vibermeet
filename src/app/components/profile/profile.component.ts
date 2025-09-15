import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileForm: FormGroup;
  isEditing = false;
  isLoading = false;

  availableCategories = [
    'music', 'comedy', 'dance', 'education', 'sports', 
    'food', 'lifestyle', 'tech', 'art', 'travel'
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      interests: [[]],
      privacy_level: ['public']
    });
  }

  ngOnInit() {
    this.apiService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.populateForm(user);
      }
    });
  }

  populateForm(user: User) {
    this.profileForm.patchValue({
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      interests: user.preferences?.content_types || [],
      privacy_level: user.preferences?.privacy_level || 'public'
    });
  }

  onInterestChange(category: string, event: any) {
    const interests = this.profileForm.get('interests')?.value || [];
    if (event.target.checked) {
      if (!interests.includes(category)) {
        interests.push(category);
      }
    } else {
      const index = interests.indexOf(category);
      if (index > -1) {
        interests.splice(index, 1);
      }
    }
    this.profileForm.get('interests')?.setValue(interests);
  }

  isInterestSelected(category: string): boolean {
    const interests = this.profileForm.get('interests')?.value || [];
    return interests.includes(category);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const formData = this.profileForm.value;

      if (this.currentUser) {
        // Update existing profile
        const updateData = {
          user_id: this.currentUser.user_id,
          username: formData.username,
          bio: formData.bio,
          preferences: {
            content_types: formData.interests,
            privacy_level: formData.privacy_level
          }
        };

        this.apiService.updateUser(updateData).subscribe({
          next: (response) => {
            this.notificationService.success('Success', 'Profile updated successfully!');
            this.apiService.setCurrentUser(response.profile);
            this.isEditing = false;
            this.isLoading = false;
          },
          error: (error) => {
            this.notificationService.error('Error', 'Failed to update profile');
            this.isLoading = false;
          }
        });
      } else {
        // Create new profile
        const createData = {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          interests: formData.interests,
          privacy_level: formData.privacy_level
        };

        this.apiService.createUser(createData).subscribe({
          next: (response) => {
            this.notificationService.success('Welcome!', 'Profile created successfully!');
            this.apiService.setCurrentUser(response.profile);
            this.isLoading = false;
          },
          error: (error) => {
            this.notificationService.error('Error', 'Failed to create profile');
            this.isLoading = false;
          }
        });
      }
    } else {
      this.notificationService.warning('Invalid Form', 'Please fill in all required fields correctly');
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.currentUser) {
      this.populateForm(this.currentUser);
    }
  }

  deleteProfile() {
    if (this.currentUser && confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.apiService.deleteUser(this.currentUser.user_id).subscribe({
        next: () => {
          this.notificationService.success('Deleted', 'Profile deleted successfully');
          this.apiService.logout();
        },
        error: (error) => {
          this.notificationService.error('Error', 'Failed to delete profile');
        }
      });
    }
  }
}