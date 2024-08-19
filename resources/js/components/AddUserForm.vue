<template>
    <div style="position: relative;">
        <div v-if="isLoading"
             style="position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             display: flex;
             align-items: center;
             justify-content: center;
             background-color: rgba(255, 255, 255, 0.8);
             z-index: 9999;">
            <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        </div>

        <form>
            <v-text-field
                v-model="formData.name"
                :error-messages="errors.name"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="formData.email"
                :error-messages="errors.email"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="formData.phone"
                :error-messages="errors.phone"
                label="Phone"
                required
            ></v-text-field>

            <v-select
                v-model="formData.position_id"
                :error-messages="errors.position_id"
                :items="positions"
                item-title="name"
                item-value="id"
                label="Position"
                required
            ></v-select>

            <v-file-input
                v-model="formData.photo"
                :error-messages="errors.photo"
                accept="image/*"
                label="Upload photo"
                prepend-icon="mdi-camera"
                @change="onFileSelected"
            ></v-file-input>

            <v-img
                v-if="imagePreview"
                :src="imagePreview"
                max-height="300"
                max-width="300"
                class="mt-4"
            ></v-img>

            <v-btn
                class="me-4"
                @click.prevent="createUser"
            >
                submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </form>
    </div>
</template>

<script>
import {EventBus} from "../event-bus.js";

export default {
    name: 'AddUserForm',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                phone: '',
                position_id: null,
                photo: null,
            },
            errors: [],
            positions: [],
            imagePreview: null,
            isLoading: true
        }
    },
    created() {
        this.fetchPositions();
    },
    methods: {
        async createUser() {
            this.errors = [];
            this.isLoading = true;
            const token = await this.getToken();
            const formData = new FormData();
            for (let key in this.formData) {
                formData.append(key, this.formData[key]);
            }
            try {
                const response = await this.$axios.post('/api/users', formData, {
                    headers: { token }
                });
                if (response.data.success) {
                    this.clear();
                    EventBus.emit('userAdded', response.data.user);
                    this.$toast(response.data.message, {
                        type: 'success'
                    });
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    console.error("Error adding user:", error);
                }
                this.$toast(error.response.data.message, {
                    type: 'error'
                });
            } finally {
                this.isLoading = false;
            }
        },
        clear() {
            for (let key in this.formData) {
                this.formData[key] = null;
            }
            this.errors = [];
            this.imagePreview = null;
        },
        onFileSelected(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async getToken() {
            try {
                const response = await this.$axios.get('/api/token');
                return response.data.token;
            } catch (error) {
                console.error("Error fetching token:", error);
                return null;
            }
        },
        async fetchPositions() {
            this.isLoading = true;
            try {
                const response = await this.$axios.get('/api/positions');
                if (response.data.success) {
                    this.positions = response.data.positions;
                }
            } catch (error) {
                console.error("Error fetching positions:", error);
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>
