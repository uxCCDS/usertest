<template>
    <div class='itm con_flex_row'>
        <div class='col1 flex_none'>
            <div class='avatar' v-if='!isMe' v-bind:style='{backgroundImage: avatarUrl}' >
                <span v-if='!avatar'>{{ abbr }}</span>
            </div>
        </div>
        <div class='flex_1' v-bind:class='{rightAlign: isMe}'>
            <div class='lb_name' >{{ name2name }}</div>
            <div class='lb_msg' >{{ msg }}</div>
        </div>
    </div>
</template>

<script>


export default {
    props:[
        'name',
        'to',
        'msg',
    ],
    data() {
        return {
            
        }
    },
    computed:{
        avatar(){
            let people = this.$store.getters.people(this.name);
            if(people){
                return people.avatar;
            }else{
                return null;
            }
        },
        avatarUrl(){
            if(this.avatar){
                return 'url('+this.$store.state.avatarPath+this.avatar+')';
            }else{
                return 'none';
            }
        },
        abbr(){
            let arr = this.name.split(' ');
            return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
        },
        isMe(){
            let people = this.$store.getters.people(this.name);
            if(people){
                return people.me;
            }else{
                return false;
            }
        },
        name2name(){
            let people = this.$store.getters.people(this.name);
            if(!people){
                return '';
            }
            if(!people.me){
                return this.name + ' to ' + this.to;
            }else{
                return 'You to ' + this.to;
            }
        },
    },
    mounted(){
        
    },
    watch: {
        
    },
    methods:{

    }
}
</script>


<style scoped>
.itm {
    margin: 15px 15px 0 15px;
}
.col1 {
    width: 40px;
}
.avatar {
    position: absolute;
    width: 28px;
    height: 28px;
    left: 0;
    top: 6px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #F5F5F6;
    text-align: center;
}
.avatar span{
    line-height: 28px;
    font-size: 10px;
    color: #33AC96;
}
.lb_name {
    color: #6A6B6C;
    font-size: 12px;
}
.lb_msg {
    font-size: 12px;
    cursor: text;
    user-select: text;
}
.rightAlign {
    text-align: right;
}
</style>