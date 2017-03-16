var Controller = cc.Class({
    extends: cc.Component,

    properties: {
        txtCurrentState: cc.Label,
        btnSleep: cc.Button,
        btnWake: cc.Button,
        spriteCurrentState: cc.Sprite,
        sfSleep: cc.SpriteFrame,
        sfIdle: cc.SpriteFrame
    },

    onLoad: function () {
        this._fsm('資料貓');
        this.sleep('s參數1','s參數2');
        this.wake('w參數1','w參數2')
    },

    update: function (dt) {

        this.txtCurrentState.string = this.state;

        this.btnSleep.interactable = this.is('idle');
        this.btnWake.interactable = this.is('sleeping');

        // if(this.state == 'sleeping'){
        //     // this.spriteCurrentState.node.active = false;
        //     this.spriteCurrentState.spriteFrame = this.sfSleep;
        // } else {
        //     // this.spriteCurrentState.node.active = true;
        //     this.spriteCurrentState.spriteFrame = this.sfIdle;
        // }

        // cc.log("fsm.transitions()  :",this.transitions());
        // cc.log("fsm.allTransitions()  :",this.allTransitions());
        // cc.log("fsm.allStates()  :",this.allStates());
        
    },

    onCloseLight: function(){
        // this.resolve();
    }

});

StateMachine.factory(Controller, {
    init: 'idle',
    transitions: [
        // name:transition , form: state , to: state
        { name: 'sleep', from: 'idle', to: 'sleeping' },
        { name: 'wake', from: 'sleeping', to: 'idle' }
    ],
    data: function(cat){
        return{
            cat:cat
        }
    },

    methods: {
        onBeforeSleep: function () {
            // return false;
        },
        onLeaveIdle: function () {
            // return new Promise(function(resolve,reject){
            //     cc.log('gotoSleep');
            //     resolve();
            // })

        },
        onEnterIdle:function(){
            return new Promise(function(resolve,reject){
                 $('#idle').fadeIn('fast', resolve)
            })
            //     setTimeout(function () {
            //         resolve();
            //     }.bind(this), 2000);
            // })
        },
        onLeaveSleeping: function () {

        },
        onEnterSleeping:function(){
            // return new Promise(function(resolve,reject){
            //     $('#sleeping').fadeIn('fast', resolve)
            // })
            return new Promise(function(resolve,reject){
                 $('#sleeping').fadeIn('fast', resolve)
            })
        },


        onSleep: function () {
 

                this.spriteCurrentState.spriteFrame = this.sfSleep;
                // setTimeout(function () {
                //     this.wake();
                // }.bind(this), 2000);
           
                cc.log("fsm.allStates()  :",this.allStates());
            
                // return new Promise(function(resolve,reject){
                // //  $('#idle').fadeIn('fast', resolve)
                //     setTimeout(function () {
                //         resolve();
                //     }.bind(this), 2000);
                // })
            
           
            
        },
        onWake: function () {
            this.spriteCurrentState.spriteFrame = this.sfIdle;
            
            cc.log("fsm.allStates()  :",this.allStates());
            
            cc.log('data : ',this.cat);
        },

       
        onTransition : function(lifecycle,arg1){
            cc.log('轉換');
            cc.log('lifecycle.transition',lifecycle.transition);
            cc.log('lifecycle.from',lifecycle.from);
            cc.log('lifecycle.to',lifecycle.to);
            cc.log("fsm.allTransitions()  :",this.allTransitions());
            // cc.log(arg1);
        }

    }
});

