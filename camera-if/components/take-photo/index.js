Component({
    properties: {},
    data: {
        hide:false,
        navBarTop:64
    },
    methods: {
        hide(){
            this.setData({
                hide:true
            })
        },
        show(){
            this.setData({
                hide:false
            })
        },
        takePhoto: function(){
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting["scope.camera"]) {
                        const ctx = wx.createCameraContext();
                        console.log('开始拍照')
                        ctx.takePhoto({
                            quality:"high",
                            success: (res) =>  {
                                const tempPhoto = res.tempImagePath;
                                this.setData({
                                    photoPath:tempPhoto
                                })
                                this.triggerEvent('finish-photo',tempPhoto)
                                console.log('拍照成功')
                            },
                            fail:(error) =>{
                                console.error('拍照失败:',error)
                            }
                        })
                    }
                }
            })
        },
    }
});
