<script setup lang="ts">
import {computed, type Ref, ref, watch} from "vue";
import {useUserStore} from "@/stores/userStore.ts";
import {timeAgo} from "@/helpers/calcTimeAgo.ts";
import Loading from "@/components/Loading.vue";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";

const supabaseStore = useSupabaseStore()
const userStore = useUserStore()

const firstName = ref<string>('');
const lastName = ref<string>('');
const website = ref<string>('');

const isEditingFirstName = ref(false)
const isEditingLastName = ref(false)
const isEditingWebsite = ref(false)

type EditableField = 'first_name' | 'last_name' | 'personal_website'

const handleEditButton = async (field: EditableField, data: string) => {
  const isFieldEditing: Record<EditableField, Ref<boolean>> = {
    first_name: isEditingFirstName,
    last_name: isEditingLastName,
    personal_website: isEditingWebsite,
  }

  const fieldRef = isFieldEditing[field]

  if (fieldRef.value) {
    await userStore.updateProfileData(field, data)
  }

  fieldRef.value = !fieldRef.value
}

const resetDemoData = () => {
  supabaseStore.resetDemoData()
}

const authData = computed(() => {
  return userStore.currentUserAuthData;
})

const profileDataLoading = computed(() => {
  return userStore.profileDataLoading;
})

const profileData = computed(() => {
  return userStore.currentUserProfileData[0];
})

watch(profileData, (value) => {
  if (profileData.value) {
    firstName.value = value.first_name;
    lastName.value = value.last_name;
    website.value = value.personal_website;
  }
}, {immediate: true})
</script>

<template>
  <main>
    <h1 id="account-heading">Account</h1>
    <div class="content-wrapper">
      <section v-if="authData" class="account" role="region" aria-labelledby="account-heading">
        <p class="date">User since {{ timeAgo(authData.created_at) }}</p>
        <p class="email">{{ authData.email }}</p>
      </section>
      <section v-if="profileData" class="profile" role="region" aria-labelledby="profile-heading">
        <transition>
          <Loading v-if="profileDataLoading" backdrop />
        </transition>
        <h2 class="section-header" id="profile-heading">Profile</h2>
        <fieldset class="form-section">
          <legend class="label">Name</legend>
          <div class="inputs">
            <div class="input-wrapper">
              <label for="firstName" class="label">First Name</label>
              <div class="input-group">
                <input
                  id="firstName"
                  type="text"
                  class="input"
                  v-model="firstName"
                  :disabled="!isEditingFirstName"
                />
                <button
                  class="edit-button"
                  type="button"
                  @click="handleEditButton('first_name', firstName)"
                  :aria-label="isEditingFirstName ? 'Save first name' : 'Edit first name'"
                >
                  {{ isEditingFirstName ? '✔️' : '✏️' }}
                </button>
              </div>
            </div>
            <div class="input-wrapper">
              <label for="lastName" class="label">Last Name</label>
              <div class="input-group">
                <input
                  id="lastName"
                  type="text"
                  class="input"
                  v-model="lastName"
                  :disabled="!isEditingLastName"
                />
                <button
                  class="edit-button"
                  type="button"
                  @click="handleEditButton('last_name', lastName)"
                  :aria-label="isEditingLastName ? 'Save last name' : 'Edit last name'"
                >
                  {{ isEditingLastName ? '✔️' : '✏️' }}
                </button>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="position">
          <label class="label" for="position">Position</label>
          <div id="position" class="position-value" aria-readonly="true">
            {{ profileData.position }}
          </div>
        </div>
        <fieldset class="form-section">
          <legend class="label">Website</legend>
          <div class="input-wrapper">
            <label for="website" class="sr-only">URL</label>
            <div class="input-group">
              <input
                id="website"
                type="text"
                class="input"
                v-model="website"
                :disabled="!isEditingWebsite"
              />
              <button
                class="edit-button"
                type="button"
                @click="handleEditButton('personal_website', website)"
                :aria-label="isEditingWebsite ? 'Save website' : 'Edit website'"
              >
                {{ isEditingWebsite ? '✔️' : '✏️' }}
              </button>
            </div>
          </div>
        </fieldset>
      </section>
      <section class="danger-zone">
        <h2 class="section-header" id="profile-heading">Danger Zone</h2>
        <button class="reset-button" @click="resetDemoData">Reset database</button>
      </section>
    </div>
  </main>
</template>


<style scoped lang="scss">
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: $spacer-sm;

  .account {
    border: 1px solid $darkgray;
    width: fit-content;
    padding: .5rem $spacer-sm;
    border-radius: $radius;
    color: $lightgray;
    position: relative;

    .email {
      color: $lightgray;
    }
  }

  .profile {
    border: 1px solid $darkgray;
    width: fit-content;
    padding: $spacer-sm;
    border-radius: $radius;
    display: flex;
    flex-direction: column;
    gap: $spacer-sm;
    position: relative;

    .section-header {
      margin: 0;
    }

    .label {
      font-weight: bold;
    }
    .position {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      margin: $spacer-sm 0;
      border: 1px solid $darkgray;
      border-radius: $radius;
      padding: $spacer-sm;

      .inputs {
        display: flex;
        flex-wrap: wrap;
        gap: $spacer-sm;
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: .25rem;

        .label {
          font-weight: bold;
        }

        .input-group {
          display: flex;
          align-items: center;

          .input {
            flex: 1;
            background: $primary;
            border: 1px solid $lightgray;
            border-radius: $radius;
            padding: .5rem $spacer-sm;
            color: $text;

            &:focus {
              outline: none;
            }

            &:disabled {
              border: 1px solid $darkgray;
            }
          }

          .edit-button {
            background: $primary;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }

  .danger-zone {
    border: 1px solid $danger;
    width: fit-content;
    padding: $spacer-sm;
    border-radius: $radius;
    display: flex;
    flex-direction: column;
    gap: $spacer-sm;

    .section-header {
      color: $danger;
      margin: 0;
    }

    .reset-button {
      background: $danger;
      border: 1px solid $darkgray;
      border-radius: $radius;
      color: $text;
      padding: .5rem $spacer-sm;
      cursor: pointer;
      transition: $transition;

      &:hover {
        border: 1px solid $lightgray;
      }
    }
  }
}
</style>
