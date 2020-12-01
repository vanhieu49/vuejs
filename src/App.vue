<template>
	<div id="app">
		 <div class="wrapper clearfix">
            <Player
            v-bind:isWinner="isWinner"
			v-bind:scoresPlayer="scoresPlayer"
			:currentScore="currentScore"
			:activePlayer="activePlayer"
			/>
            <Controls
            v-bind:isPlaying="isPlaying"
            v-bind:finalScore="finalScore"
            v-on:handleChangeFinalScore="handleChangeFinalScore"
			v-on:handleNewGame="handleNewGame"
             v-on:handleRollDice="handleRollDice"
             v-on:handlHoldScore="handlHoldScore"
			/>
			<Dices
            v-bind:dices="dices"
            />
            <PopupRule
            v-on:handleConfirm="handleConfirm"
            v-bind:isOpenPopup="isOpenPopup"
            />
        </div>
	</div>
</template>

<script>
import Player from './components/Players'
import Controls from './components/Controls'
import Dices from './components/Dices'
import PopupRule from './components/PopupRule'

export default {
	name: 'app',
	data () {
		return {
			isPlaying:false,
            isOpenPopup:false,
			activePlayer:1,
			scoresPlayer:[0,0],
            currentScore:0,
            dices:[1,5],
            finalScore:10
		}
	},
	components: {
		Player,
		Controls,
        Dices,
        PopupRule
    },
    computed:{
        isWinner(){
            let {scoresPlayer,finalScore} =this;
            if(scoresPlayer[0] >= finalScore || 
            scoresPlayer[1] >= finalScore){
                this.isPlaying = false;

                return true;
            }
            return false;
        }
    },
    methods:{
        handleChangeFinalScore(e){
            let number = parseInt(e.target.value)
            if(isNaN(number)){
                this.finalScore = '';
            }else{
                 this.finalScore = number;
            }
           
        },
        handleNewGame(){
            this.isOpenPopup = true;
        },
        handleConfirm(){
           this.isPlaying = true;
           this.isOpenPopup = false;
           this.activePlayer = 0;
           this.scoresPlayer = [0,0],
           this.currentScore = 0;  
           this.dices = [1,1];  
        },
        handleRollDice(){
            console.log("app.vue")
            if(this.isPlaying){
                //xoay xuc xac
                //Math.random(): 0 ->1
                let dice1 = Math.floor(Math.random()*6)+1;
                let dice2 = Math.floor(Math.random()*6)+1;
                this.dices=[dice1,dice2]
                if(dice1 === 1 || dice2===1){
                    let activePlayer = this.activePlayer;
                    setTimeout(() => {
                        alert(`Người chơi Player ${activePlayer + 1} đã quay trúng số 1. Rất tiếc.`)
                    }, 10);
                    this.nextPlayer()
                }else{
                    this.currentScore = this.currentScore + dice1 + dice2;
                }
            }else{
                alert("Vui lòng nhấn vào nút NewGame")
            }
        },
        nextPlayer(){
            this.activePlayer = this.activePlayer === 0? 1 : 0;
            this.currentScore = 0
        },
        handlHoldScore(){
            console.log("handler Holde score")
            if(this.isPlaying){
                let {scoresPlayer,activePlayer,currentScore} = this;
                let cloneScorePlayer = [...scoresPlayer];
                let scoreOld = scoresPlayer[activePlayer];
                cloneScorePlayer[activePlayer] = scoreOld + currentScore;
                this.scoresPlayer = cloneScorePlayer

                if(!this.isWinner){
                    this.nextPlayer();
                }
            }else{
                alert("Vui lòng nhấn vào nút NewGame")
            }
        }
    }
}
</script>

<style>
/**********************************************
*** GENERAL
**********************************************/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

body {
    background-image: linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), 
	url('/public/assets/back.jpg');
    background-size: cover;
    background-position: center;
    font-family: Lato;
    font-weight: 300;
    position: relative;
    height: 100vh;
    color: #555;
}

.wrapper {
    width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

</style>
