<template>
  <div class="wrapper-popup" v-bind:class="getClassPopup">
     <div class="rule">
            <h3>Luật chơi</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis atque a cumque necessitatibus, placeat assumenda libero labore fugit at eos esse, dolor voluptas nobis quia, ea voluptatem hic sequi perferendis!</p>
            <button class="confirm"
            v-on:click="confirm"
            >Đã hiểu</button>
     </div>
  </div>
</template>

<script>
export default {
    name:'popup-rule',
    props:{
        isOpenPopup:{type:Boolean,default:false}
    },
    data(){
        return{

        }
    },
    computed:{
        getClassPopup(){
            return{
                "open-popup":this.isOpenPopup
            }
        }
    },
    methods:{
        confirm(){
            console.log("confirm popup.vue")
            this.$emit("handleConfirm")
        }
    }

}
</script>

<style>
.wrapper-popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
}
.rule{
    width: 350px;
    top:50%;
    left: 20%;
    padding: 20px;
    transform: translate(50%,-50%) scale(1.2);
    background-color: #fff;
    position: absolute;
    font-family: Arial, Helvetica, sans-serif;
    transition: all .3s ease;
}
.wrapper-popup.open-popup{
    opacity: 1;
    visibility: visible;
    transition: all .3s ease;
}
.open-popup .rule{
    transform: translate(50%,-50%) scale(1);
}
.rule h3{
 margin-bottom: 10px;
}
.rule .confirm{
    border: 1px solid #333;
    padding: 8px 15px;
    margin-top: 20px;
    cursor: pointer;
    transition: all .3s ease;
}
.rule .confirm:hover{
    color: #fff;
    background-color: #333;
}
</style>