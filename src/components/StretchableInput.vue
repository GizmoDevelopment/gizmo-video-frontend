<template>
    <div class="stretchable-input-container">
        <input

            ref="input"

            type="text"
            autocomplete="off"

            :placeholder="placeholder"
            :disabled="!isEnabled"
            :style="inputStyle"
            :maxlength="maxLength"
            
            @keydown.enter.prevent="submitInput()"
            @keydown="resizeInput()"
            @change="resizeInput()"
            @blur="resizeInput()"

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
            "size",
            "maxLength",
            "clearAfterSubmit"
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
                return `font-size: ${ size + 5 }px; `;
            }
        },
        methods: {
            submitInput () {

                const { input } = this.$refs;

                if (input) {

                    const value = input.value.trim();
                    
                    if (value.length > 0) {

                        this.$emit("submit", value);

                        if (this.clearAfterSubmit) {
                            input.blur();
                            input.value = "";
                        }
                    }
                }
            },
            resizeInput () {
                /*
                    if (this.stretch && this.defaultWidth) {

                        const { input } = this.$refs;

                        if (input) {

                            true
                        }
                    }
                */
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

    .stretchable-input-container input {
        flex: 1;
        /* transition: .2s width linear; */
    }
    .stretchable-button-container {
        flex: 0;
        margin-left: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .stretchable-button-container:hover {
        cursor: pointer;
    }

</style>