<template>
    <div v-if="room" id="room-container">
        <div id="title-container">
            <h1>{{ room.name }}</h1>
            <ion-icon
                id="room-leave"
                name="exit-outline"
                @click="leaveRoom()"
            ></ion-icon>
        </div>
        <RoomUserList
            :users="room.users"
            :host="room.host"
        />
        <p></p>
        <VideoPlayer
            :data="room.data"
            :isHost="isHost"
        />
        <RoomChat />
    </div>
    <div v-else>
        <Buffer />
    </div>
</template>

<script>

    // Components
    import Buffer from "../components/Buffer";
    import VideoPlayer from "../components/VideoPlayer";
    import RoomUserList from "../components/RoomUserList";
    import RoomChat from "../components/RoomChat";

    export default {
        name: "Room",
        props: [ "roomId" ],
        components: {
            Buffer,
            VideoPlayer,
            RoomUserList,
            RoomChat
        },
        data () {
            return {
                room: null
            };
        },
        computed: {
            user () {
                return this.$store.state.user;
            },
            isHost () {
                return this.user.id === this.room.host.id;
            }
        },
        methods: {
            leaveRoom () {
                this.$socket.emit("client:leave_room", { roomId: this.room.id }, ({ type, message }) => {
                    if (type === "success") {
                        this.$store.state.room = null;
                        this.$router.push("/rooms");
                    } else {
                        console.error(message);
                    }
                });
            }
        },
        mounted () {

            const savedRoom = this.$store.state.room;

            if (savedRoom) {
                
                this.$socket.emit("client:fetch_room", { roomId: savedRoom.id }, ({ type, message }) => {
                    if (type === "success") {
                        this.room = message;
                        this.$store.state.room = message;
                    } else {
                        console.error(message);
                    }
                });

            } else {
                this.$socket.emit("client:join_room", { roomId: this.roomId }, ({ type, message }) => {
                    if (type === "success") {
                        this.room = message;
                        this.$store.state.room = message;
                    } else {
                        console.error(message);
                    }
                });
            }

            this.sockets.subscribe("client:update_room", updatedRoomContent => {
                if (this.room) {
                    this.room.data = updatedRoomContent;
                    this.$store.commit("UPDATE_ROOM", updatedRoomContent);
                }
            });

            this.sockets.subscribe("client:join_room", user => {
                if (this.room) {
                    this.room.users.push(user);
                    this.$store.commit("UPDATE_ROOM", this.room);
                }
            });

            this.sockets.subscribe("client:leave_room", userId => {
                if (this.room) {
                    this.room.users = this.room.users.filter(user => user.id !== userId);
                }
            });

        }
    }

</script>

<style scoped>

    #room-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #title-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #room-leave {
        margin-left: 20px;
        font-size: 25px;
    }

    #room-leave:hover {
        cursor: pointer;
    }

</style>