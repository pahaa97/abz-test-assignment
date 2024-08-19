<template>
    <v-main>
        <v-container>
            <h1 class="text-center pa-5">Test Assignment - Users Database</h1>
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
