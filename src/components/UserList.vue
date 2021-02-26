<template>
    <div id="user-list-container">
        <h2>Online Users</h2>
        <div id="user-list">
            <div class="user-entry" v-for="user in users" :key="user.id">
                <img class="user-avatar" :src="user.avatar" alt="User profile picture">
                <p class="user-name">{{ user.uid }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: "UserList",
        data () {
            return {
                users: {}
            };
        },
        mounted () {

            this.sockets.subscribe("user:connect", user => {
                if (user) this.$set(this.users, user.id, user);
            });

            this.sockets.subscribe("user:disconnect", userId => {
                if (userId) this.$delete(this.users, userId);
            });

            this.sockets.subscribe("user:fetchAll", users => {
                if (users) this.users = users;
            });

            this.$socket.emit("data", {
                type: "user:fetchAll"
            });

        }    
    }

</script>

<style scoped>

    #user-list-container {
        background-color: #222;
        border-radius: 15px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-top: 10px;
        width: 300px;
    }

    #user-list-container h2  {
        margin-top: 0;
    }

    #user-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .user-entry {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .user-name {
        margin: 0;
        margin-left: 10px;
        font-size: 25px;
    }

    .user-avatar {
        height: 25px;
        height: 25px;
        border-radius: 100%;
    }

</style>