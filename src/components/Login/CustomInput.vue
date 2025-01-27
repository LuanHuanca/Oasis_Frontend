<template>
    <div class="CustomInput">
        <p>{{ label }}</p>
        <input
            :type="inputType"
            :placeholder="placeholder"
            :v-model="v-model"
            required
        >
    </div>
</template>

<script>
export default {
    name: "CustomInput",
    props: {
        label: {
            type: String,
            default: "Input Label"
        },
        placeholder: {
            type: String,
            default: "Enter value"
        },
        v_model: {
            type: [String, Number],
            default: ""
        },
        inputType: {
            type: String,
            default: "text"
        },
    }
};
</script>

<style scoped>
.CustomInput {
    width: 85%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0px;
}
.CustomInput p {
    padding: 0;
    margin: 0;
}
.CustomInput input {
    border: 2px solid black;
    border-radius: 25px;
    padding: 10px 20px;
}
</style>
