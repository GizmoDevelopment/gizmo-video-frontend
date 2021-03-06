<template>
    <div class="stretchable-input-container">
        <input

            ref="input"

            type="text"
            autocomplete="off"

            :placeholder="placeholder"
            :disabled="!isEnabled"
            :style="inputStyle"
            
            @keydown.enter.prevent="submitInput()"

        >
        <div
            v-if="button"
            class="stretchable-button-container"
            @click="submitInput()"
        >
            <ion-icon
                :name="button"
                :style="buttonStyle"
            ></ion-icon>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: "StretchableInput",
        props: [
            "placeholder",
            "enabled",
            "stretch",
            "button",
            "size"
        ],
        computed: {
            isEnabled () {
                return this.enabled && this.enabled || true;
            },
            inputStyle () {
                
                const size = this.size || 20;

                return `font-size: ${ size }px;`;
            },
            buttonStyle () {
                
                const size = parseInt(this.size || 20);

                return `font-size: ${ size + 10 }px;`;
            }
        },
        methods: {
            submitInput () {

                const { input } = this.$refs;

                if (input) {

                    const value = input.value.trim();
                    
                    if (value.length > 0) {
                        this.$emit("submit", value);
                    }
                }
            }
        }
    }

</script>

<style scoped>

    .stretchable-input-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .stretchable-button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .stretchable-button-container:hover {
        cursor: pointer;
    }

</style>