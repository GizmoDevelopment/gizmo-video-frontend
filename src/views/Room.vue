<template>
    <div v-if="room" id="room-container">
        <div id="title-container">
            <h1>{{ room.name }}</h1>
            <button
                id="room-leave-button"
                @click="leaveRoom()"
            >
                <ion-icon
                    name="exit-outline"
                ></ion-icon>
            </button>
        </div>
        <RoomUserList
            :users="room.users"
            :host="room.host"
        />
        <p></p> <!-- shitty method to add spacing -->
        <RoomVideo
            :data="room.data"
            :isHost="isHost"
        />
        <p></p> <!-- shitty method to add spacing -->
        <p></p> <!-- shitty method to add spacing -->
        <RoomChat
            :messages="room.messages"
        />
    </div>
    <div v-else>
        <div v-if="roomJoinResponse">
            <h2 class="faded-text">{{ roomJoinResponse }}</h2>
        </div>
        <div v-else>
            <Buffer />
        </div>
    </div>
</template>

<script>

    // Components
    import Buffer from "../components/Buffer";
    import RoomVideo from "../components/RoomVideo";
    import RoomUserList from "../components/RoomUserList";
    import RoomChat from "../components/RoomChat";

    export default {
        name: "Room",
        props: [ "roomId" ],
        components: {
            Buffer,
            RoomVideo,
            RoomUserList,
            RoomChat
        },
        data () {
            return {
                room: null,
                roomJoinResponse: ""
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
                        this.$store.commit("UPDATE_ROOM", message);
                    } else {
                        console.error(message);
                        this.roomJoinResponse = message;
                    }
                });

            } else {
                this.$socket.emit("client:join_room", { roomId: this.roomId }, ({ type, message }) => {
                    if (type === "success") {
                        this.room = message;
                        this.$store.commit("UPDATE_ROOM", message);
                    } else {
                        console.error(message);
                        this.roomJoinResponse = message;
                    }
                });
            }

            this.sockets.subscribe("client:update_room", updatedRoomContent => {
                if (this.room) {
                    this.room.data = updatedRoomContent;
                    this.$store.commit("UPDATE_ROOM_DATA", updatedRoomContent);
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
            
            this.sockets.subscribe("client:send_message", message => {
                if (this.room) {
                    this.room.messages.push(message);
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

    #room-leave-button {
        margin-left: 20px;
        font-size: 25px;
    }

</style>