<template>
    <div v-if="rooms">
        <h1 id="room-creation-title">Create Room</h1>
        <div v-if="roomCreationResponse">
            <span id="room-creation-response">{{ roomCreationResponse }}</span>
        </div>
        <div id="room-creation-container">
            <input
                ref="createRoomName"
                id="create-room-input" 
                type="text"
                placeholder="Room name..."
            >
            <div v-if="allowRoomCreation">
                <ion-icon
                    name="add-circle-outline"
                    @click="createRoom"
                ></ion-icon>
            </div>
        </div>
        <h1>Rooms</h1>
        <div id="room-container">
            <div v-for="room in rooms" :key="room.id">
                <RoomCard :room="room" />
            </div>
        </div>
    </div>
</template>

<script>

    // Components
    import RoomCard from "../components/RoomCard";

    export default {
        name: "RoomList",
        components: {
            RoomCard
        },
        data () {
            return {
                rooms: null,
                allowRoomCreation: true,
                roomCreationResponse: ""
            };
        },
        methods: {
            async createRoom () {

                const name = this.$refs.createRoomName.value;

                if (name && name.trim().length > 0) {
                    this.$socket.emit("client:create_room", { roomName: name }, ({ type, message }) => {
                        
                        if (type === "success") {
                            this.$router.push(`/rooms/${ message.id }`);
                        } else {
                            console.error(message);
                            this.roomCreationResponse = message;
                        }

                        this.allowRoomCreation = true;
                    });
                }

            }
        },
        mounted () {
            
            this.$socket.emit("client:fetch_rooms", ({ type, message }) => {
                if (type === "success") {
                    this.rooms = message;
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

    #create-room-input {
        font-size: 25px;
    }

    #room-creation-container ion-icon {
        font-size: 30px;
    }

    #room-creation-container ion-icon:hover {
        cursor: pointer;
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

</style>