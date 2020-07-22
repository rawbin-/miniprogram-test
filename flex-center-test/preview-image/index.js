Component({
    options:{
        // styleIsolation:'isolated'
    },
    properties: {
        imagePathList: {
            type: Array,
            value: []
        },
        startIndex:{
            type: Number,
            value: 0
        }
    },
    data: {
        currentImagePath: '',
        currentImagePathList: [],
        currentIndex: 0, //用数组的序号值更简单
        totalCount: 1,
        prevDisabled: false,
        nextDisabled: false,
        hide:false,
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
        closeThis() {
            this.triggerEvent("end-preview",this.data.currentImagePathList);
            wx.navigateBack()
        },
        toPrev() {
            let {currentIndex} = this.data;
            if (currentIndex > 0) {
                currentIndex--;
                this.setData({
                    currentIndex
                })
            }

            this.setDataState()
        },
        toNext() {
            let {currentIndex, totalCount} = this.data;
            if (currentIndex < totalCount - 1) {
                currentIndex++;
                this.setData({
                    currentIndex
                })
            }

            this.setDataState()
        },
        deleteImg() {
            let {currentImagePathList, currentIndex, totalCount} = this.data;
            let newPathList = [...currentImagePathList]
            if (totalCount >= 0) {
                //先从当前位置删再重设索引值
                newPathList.splice(currentIndex, 1);
                if(currentIndex > 0){
                    currentIndex--
                }

                totalCount--;

                this.setData({
                    currentImagePathList: newPathList,
                    currentIndex,
                    totalCount
                })
                if(newPathList.length === 0){
                    this.closeThis()
                }
            }

            this.setDataState()
        },
        confirmDelete() {
            console.log('confirmDelete')
            this.confirmComponent.show()
        },
        setDataState() {
            //小程序setData 改数据是同步的所以可以这么玩
            const {currentIndex, totalCount,currentImagePathList} = this.data;
            const prevDisabled = currentIndex <= 0;
            const nextDisabled = currentIndex >= totalCount - 1
            const currentImagePath  = currentImagePathList[currentIndex] || ''
            this.setData({
                currentImagePath,
                prevDisabled,
                nextDisabled
            })
        },
    },
    lifetimes: {
        attached() {
            const {imagePathList,startIndex} = this.data;
            const newImagePathList = [...imagePathList]
            const imageCount = imagePathList.length;
            const currentIndex = startIndex < imageCount ? startIndex : 0
            //初始化所有数据
            this.setData({
                currentImagePath: imageCount > 0 ? imagePathList[0] : '',
                currentImagePathList: newImagePathList,
                currentIndex,  //用数组的序号值更简单
                totalCount: imageCount
            });
            this.setDataState()
            //避免操作原有引用对象

            this.confirmComponent = this.selectComponent("#preview-delete-confirm");
        }
    }
});
