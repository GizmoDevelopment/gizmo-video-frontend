<template>
    <div>
        <h1 id="room-creation-title">Create Room</h1>
        <span id="room-creation-response">{{ roomCreationResponse }}</span>
        <div v-if="allowRoomCreation" id="room-creation-input-container">
            <StretchableInput
                id="room-creation-input"
                ref="createRoomInput"
                placeholder="Room name..."
                :enabled="allowRoomCreation"
                stretch="false"
                button="add-circle-outline"
                size="20"
                @submit="createRoom"
            />
        </div>
        <div v-else>
            <Buffer />
        </div>
        <h1>Rooms</h1>
        <div id="room-container" v-if="rooms">
            <div v-for="room in rooms" :key="room.id">
                <RoomCard :room="room" />
            </div>
        </div>
        <div v-else>
            <h3 class="faded-text">No active rooms :(</h3>
        </div>
    </div>
</template>

<script>

    // Components
    import RoomCard from "../components/RoomCard";
    import StretchableInput from "../components/StretchableInput";
    import Buffer from "../components/Buffer";

    export default {
        name: "RoomList",
        components: {
            RoomCard,
            StretchableInput,
            Buffer
        },
        data () {
            return {
                rooms: null,
                allowRoomCreation: true,
                roomCreationResponse: ""
            };
        },
        methods: {
            async createRoom (roomName) {
                if (roomName && this.allowRoomCreation) {

                    const cleanRoomName = roomName.trim();

                    if (cleanRoomName.length <= 40) {
                        this.$socket.emit("client:create_room", { roomName }, ({ type, message }) => {
                            if (type === "success") {
                                this.$router.push(`/rooms/${ message.id }`);
                            } else {
                                console.error(message);
                                this.roomCreationResponse = message;
                            }
                        });
                    } else {
                        this.roomCreationResponse = "Room names can only be up to 40 characters long";
                    }
                }
            }
        },
        mounted () {
            
            this.$socket.emit("client:fetch_rooms", ({ type, message }) => {
                if (type === "success") {
                    if (message.length > 0) this.rooms = message.filter(room => room?.id);
                } else {
                    console.error(message);
                }
            });

        }
    }

</script>

<style scoped>

    #room-creation-title {
        margin-bottom: 10px;
    }

    #room-creation-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #room-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #room-creation-response {
        color: #f63a3a;
    }

    #room-creation-input-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #room-creation-input {
        margin-top: 5px;
        width: 400px;
    }

</style>