<template>
    <svg width="12px" height="10px" viewBox="0 0 12 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

        <g v-if='!fullscreen' stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-1007.000000, -84.000000)" class="fill">
                <g transform="translate(16.000000, 73.000000)">
                    <g transform="translate(981.000000, 0.000000)">
                        <g transform="translate(10.000000, 11.000000)">
                            <g>
                                <path d="M8.5,2 C9.327,2 10,2.673 10,3.5 L10,7.5 C10,7.775 9.776,8 9.5,8 C9.224,8 9,7.775 9,7.5 L9,3.5 C9,3.225 8.775,3 8.5,3 L3.5,3 C3.224,3 3,2.775 3,2.5 C3,2.225 3.224,2 3.5,2 L8.5,2 Z M10.5,0 C11.327,0 12,0.673 12,1.5 L12,5.5 C12,5.775 11.776,6 11.5,6 C11.224,6 11,5.775 11,5.5 L11,1.5 C11,1.225 10.775,1 10.5,1 L5.5,1 C5.224,1 5,0.775 5,0.5 C5,0.225 5.224,0 5.5,0 L10.5,0 Z M1.5,10 C0.673,10 0,9.327 0,8.5 L0,5.5 C0,4.673 0.673,4 1.5,4 L6.5,4 C7.327,4 8,4.673 8,5.5 L8,8.5 C8,9.327 7.327,10 6.5,10 L1.5,10 Z M1,5.5 L1,8.5 C1,8.775 1.225,9 1.5,9 L6.5,9 C6.775,9 7,8.775 7,8.5 L7,5.5 C7,5.225 6.775,5 6.5,5 L1.5,5 C1.225,5 1,5.225 1,5.5 Z" id="fill"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>

        <g v-if='fullscreen' stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-1007.000000, -84.000000)" class="fill">
                <g transform="translate(16.000000, 73.000000)">
                    <g transform="translate(981.000000, 0.000000)">
                        <g transform="translate(10.000000, 11.000000)">
                            <g>
                                <path d="M8.5,2 C9.327,2 10,2.673 10,3.5 L10,7.5 C10,7.775 9.776,8 9.5,8 C9.224,8 9,7.775 9,7.5 L9,3.5 C9,3.225 8.775,3 8.5,3 L3.5,3 C3.224,3 3,2.775 3,2.5 C3,2.225 3.224,2 3.5,2 L8.5,2 Z M10.5,0 C11.327,0 12,0.673 12,1.5 L12,5.5 C12,5.775 11.776,6 11.5,6 C11.224,6 11,5.775 11,5.5 L11,1.5 C11,1.225 10.775,1 10.5,1 L5.5,1 C5.224,1 5,0.775 5,0.5 C5,0.225 5.224,0 5.5,0 L10.5,0 Z M1.5,10 C0.673,10 0,9.327 0,8.5 L0,5.5 C0,4.673 0.673,4 1.5,4 L6.5,4 C7.327,4 8,4.673 8,5.5 L8,8.5 C8,9.327 7.327,10 6.5,10 L1.5,10 Z M1,5.5 L1,8.5 C1,8.775 1.225,9 1.5,9 L6.5,9 C6.775,9 7,8.775 7,8.5 L7,5.5 C7,5.225 6.775,5 6.5,5 L1.5,5 C1.225,5 1,5.225 1,5.5 Z" id="fill"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>

    </svg>

</template>

<script>

export default {
    data() {
        return  {
            
        };
    },
    computed:{
        fullscreen(){
            return this.$store.state.fullscreen;
        },
    },
	mounted(){
        
    },
	methods:{
        
	}
}
</script>

<style scoped>

</style>