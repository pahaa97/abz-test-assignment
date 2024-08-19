<template>
    <v-container>
        <v-data-table-server
            :headers="headers"
            :items="users"
            :items-length="totalItems"
            :loading="loading"
            hide-default-footer
            @update:options="loadItems"
        >
            <template v-slot:body="{ items }">
                <tr
                    v-for="item in items"
                    :key="item.id"
                    @click="showUserDetails(item.id)"
                    style="cursor: pointer;"
                >
                    <td>{{ item.id }}</td>
                    <td>
                        <v-avatar size="36">
                            <v-img :src="item.photo" />
                        </v-avatar>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.position }}</td>
                </tr>
            </template>
        </v-data-table-server>

        <v-btn
            v-if="meta.page < meta.total_pages"
            @click="loadMore"
            :loading="loading"
            block
        >
            Show More
        </v-btn>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>{{ selectedUser.name }}</span>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-subtitle class="text-center">{{ selectedUser.position }}</v-card-subtitle>
                <v-card-text class="text-center">
                    <v-avatar size="72" class="mx-auto mb-4">
                        <v-img :src="selectedUser.photo" />
                    </v-avatar>
                    <div>Email: {{ selectedUser.email }}</div>
                    <div>Phone: {{ selectedUser.phone }}</div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
    data() {
        return {
            perPage: 6,
            users: [],
            meta: {},
            loading: false,
            totalItems: 0,
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Avatar', key: 'photo' },
                { title: 'Name', key: 'name' },
                { title: 'Email', key: 'email' },
                { title: 'Phone', key: 'phone' },
                { title: 'Position', key: 'position' },
            ],
            dialog: false,
            selectedUser: {},
        };
    },
    created() {
        EventBus.on('userAdded', () => {
            this.loadItems({ page: 1, itemsPerPage: this.perPage });
        });
        this.loadItems({ page: 1, itemsPerPage: this.perPage });
    },
    methods: {
        loadItems({ page, itemsPerPage }) {
            this.loading = true;
            this.$axios.get('/api/users', {
                params: { page, count: itemsPerPage }
            })
                .then(response => {
                    this.users = response.data.users;
                    this.meta = response.data;
                    this.totalItems = response.data.total_users;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadMore() {
            this.loading = true;
            this.$axios.get('/api/users', {
                params: { page: this.meta.page + 1, count: this.perPage }
            })
                .then(response => {
                    this.users = [...this.users, ...response.data.users];
                    this.meta = response.data;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        showUserDetails(userId) {
            this.$axios.get(`/api/users/${userId}`)
                .then(response => {
                    this.selectedUser = response.data.user;
                    this.dialog = true;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text-center {
    text-align: center;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}
</style>
