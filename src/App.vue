<script>
import { Time } from './models/Time'

export default {
    name: "Countdown per Task",
    data() {
        return {
            task_time: new Time(),
            acc_time: new Time(),
            interval: null,
            taskDuration: '00:00:00',
            isPaused: false,
            taskDurationSet: false,
        }
    },
    computed: {
        signClass() {
            return this.acc_time.isPositive() ? 'positive' : 'negative';
        },
        pausedButtonText() {
            return this.isPaused ? 'Resume' : 'Pause'
        }
    },
    methods: {
        next() {
            this.acc_time.addSeconds(this.task_time.getValueInSeconds())
            let arr = this.parseTaskDuration();
            this.task_time = new Time(0, arr[0], arr[1], arr[2], '+');
        },
        reset() {
            this.taskDuration = '00:00:00'
            this.acc_time = new Time();
            this.task_time = new Time();
            clearInterval(this.interval);
            this.interval = null;
            this.taskDurationSet = false;
            this.isPaused = false;
        },
        pause() {
            if (this.isPaused) {
                this.start();
            } else {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.isPaused = !this.isPaused;
        },
        start() {
            if (this.interval) return;
            this.interval = setInterval(() => {
                this.task_time.addSeconds(-1);
            }, 1000);
        },
        setTaskDuration() {
            if (!this.taskDurationSet) {
                let arr = this.parseTaskDuration();
                this.task_time = new Time(0, arr[0], arr[1], arr[2], '+');
                this.start();
                this.taskDurationSet = true;
            }
        },
        parseTaskDuration() {
            const time = this.taskDuration.split(':');
            return [parseInt(time[0]), parseInt(time[1]), parseInt(time[2])]
        }
    },
    beforeDestroy() {
        this.pause();
    }
};
</script>

<template>
    <DraggableDiv>
        <template v-slot:header>
            <div id="header">
                <div>Countdown per Task</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="icon-2 bi bi-arrows-move" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
                </svg>
            </div>
        </template>
        <template v-slot:main>
            <div id="timer-container">
                <div id="acc" :class="[signClass]">
                    {{ this.acc_time.getFormattedTime() }}
                </div>
                <div id="timer">
                    {{ this.task_time.getFormattedTime() }}
                </div>
                <div id="buttons">
                    <button @click="reset()" :disabled="!taskDurationSet">Reset</button>
                    <button @click="pause()" :disabled="!taskDurationSet">{{ pausedButtonText }}</button>
                    <button @click="next()" :disabled="!taskDurationSet">Next</button>
                </div>
                <div id="interval-input-container">
                    <div id="input-text">Task duration</div>
                    <input type="time" v-model="taskDuration" step="1" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                        class="bi bi-arrow-bar-up icon" viewBox="0 0 16 16" @click="setTaskDuration">
                        <path fill-rule="evenodd"
                            d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>
            </div>
        </template>
        <template v-slot:footer></template>
    </DraggableDiv>
</template>

<style scoped>
    #input-text {
        margin-right: 8px;
        font-size: 16px
    }

    #header {
        background-color: #313131;
        margin-bottom: 15px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .icon {
        margin-left: 8px;
        cursor: pointer;
        padding: 5px;
        border-radius: 10px;
        transition: background-color 0.25s;
    }

    .icon:hover {
        background-color: #272727;
    }

    .icon:active {
        background-color: #313131;
    }

    #interval-input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    input[type=time] {
        border: none;
        color: #dcdcdc;
        font-size: 16px;
        font-family: "Noto Sans Mono", monospace;
        background-color: #272727;
        padding: 8px;
        border-radius: 10px;
        width: 95px;
        outline: none;
    }

    #timer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed rgba(255, 255, 255, 0.347);
        border-radius: 20px;
        padding: 20px;
        background-color: #1a1a1a;
        width: 350px;
    }

    #buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    #timer {
        font-size: 40px;
        font-family: "Noto Sans Mono", monospace;
    }

    #acc {
        font-family: "Noto Sans Mono", monospace;
    }

    .positive {
        color: rgb(108, 142, 108);
    }

    .negative {
        color: rgb(174, 121, 121);
    }
</style>
