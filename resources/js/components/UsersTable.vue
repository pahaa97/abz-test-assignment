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
            <template v-slot:item.photo="{ item }">
                <v-avatar size="36">
                    <v-img :src="item.photo" />
                </v-avatar>
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
    </v-container>
</template>

<script>
import {EventBus} from "../event-bus.js";

export default {
    data() {
        return {
            perPage: 10,
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
        }
    }
};
</script>

<style>
    .v-data-table-server {
        margin-top: 20px;
    }
    .v-btn {
        margin-top: 50px;
    }
</style>
