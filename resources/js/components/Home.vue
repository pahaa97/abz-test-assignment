<template>
    <v-main>
        <v-container>
            <AddUserForm />
            <UsersTable />
        </v-container>
    </v-main>
</template>

<script>
import AddUserForm from "./AddUserForm.vue";
import UsersTable from "./UsersTable.vue";

export default {
    name: 'Home',
    components: { AddUserForm, UsersTable },
};
</script>

<style>
    .v-main {
        padding-top: 70px;
        padding-bottom: 70px;
    }
</style>
