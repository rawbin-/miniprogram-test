const defaultData = {
    content:'---',
    cancelText:'取消',
    confirmText:'确定'
}

Component({
    options:{
        // styleIsolation:'isolated'
    },
    properties: {
        confirmConfig:{
            type:Object,
            value:{}
        }
    },
    data: {
        ...defaultData,
        hide:true
    },
    methods: {
        show(){
            this.setData({
                hide:false
            })
        },
        hide(){
            this.setData({
                hide:true
            })
        },
        cancelFunc(){
            this.triggerEvent("cancel")
            this.hide()
        },
        confirmFunc(){
            this.triggerEvent("confirm")
            this.hide()
        }
    },
    lifetimes:{
        attached() {
            const {confirmConfig} = this.data
            const defaultData = {...defaultData}
            this.setData(Object.assign(defaultData,confirmConfig))
        }
    }
});
