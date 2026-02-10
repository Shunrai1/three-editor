<template>
    <div class="threeBox" ref="threeBox" @dblclick="e => getEvent(e)"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ThreeEditor, getDistanceScalePoint, createGsapAnimation } from 'three-editor-cores';

ThreeEditor.dracoPath = '/three-editor/dist/draco/'

const threeBox = ref(null)

const props = defineProps(['emitEditor', 'options'])

let timer = null

onMounted(() => (props.emitEditor.sceneName !== '') && createScene())

function getEvent(e) {

    props.emitEditor.threeEditor.getSceneEvent(e, info => {

        props.emitEditor.info = info

        if (info.mode === '点击信息') {

            const { camera, controls } = props.emitEditor.threeEditor

            const p = getDistanceScalePoint(camera.position, info.point, 0.8)

            createGsapAnimation(camera.position, p)

            createGsapAnimation(controls.target, info.point)

        }

    })

}

function createScene(sceneParams) {
    if (timer) clearInterval(timer)

    if (!sceneParams) {

        const params = localStorage.getItem(props.emitEditor.sceneName)

        if (params) sceneParams = JSON.parse(params)

        function getIndexDBUrl(i, name) {

            const { IndexDBList } = props.emitEditor

            const item = IndexDBList.find(i => i.name === name)

            if (item) i.rootInfo.url = URL.createObjectURL(item.blob)

            else sceneParams.modelList.splice(sceneParams.modelList.indexOf(i), 1)

        }

        sceneParams?.modelList?.forEach(i => {

            if (i.rootInfo.indexDBNameUrl) {

                const [_, name] = i.rootInfo.indexDBNameUrl.split(':')

                getIndexDBUrl(i, name)

            }

        })

    }

    const threeEditor = new ThreeEditor(threeBox.value,

        {

            pixelRatio: window.devicePixelRatio * 1,

            webglRenderParams: { antialias: true, alpha: true, logarithmicDepthBuffer: true },

            sceneParams: sceneParams || {}

        }

    )

    const ishaveLight = threeEditor.scene.children.every(i => !i.isLight)

    ishaveLight && threeEditor.setLight()

    const { mode } = threeEditor.handler

    const { transformControls } = threeEditor

    if (mode == '选择') props.emitEditor.mode = '选中'

    else if (mode == '根选择') props.emitEditor.mode = '根级'

    else if (mode == '变换') {

        if (transformControls.mode == 'translate') props.emitEditor.mode = '平移'

        else if (transformControls.mode == 'rotate') props.emitEditor.mode = '旋转'

        else if (transformControls.mode == 'scale') props.emitEditor.mode = '缩放'

    }

    else if (mode == '场景绘制') props.emitEditor.mode = '绘制'

    else if (mode == '点击信息') props.emitEditor.mode = '预览'

    props.emitEditor.openKey = threeEditor.handler.openKey

    props.emitEditor.selectPanelEnable = threeEditor.handler.selectPanelEnable

    props.emitEditor.threeEditor = threeEditor

    window.onresize = () => threeEditor.renderSceneResize()

    // 监听模式变化（由于ThreeEditor内部模式变化没有抛出事件，这里采用轮询方式同步）
    timer = setInterval(() => {
        const { mode } = threeEditor.handler
        const { transformControls } = threeEditor
        let newMode = ''

        if (mode == '选择') newMode = '选中'
        else if (mode == '根选择') newMode = '根级'
        else if (mode == '变换') {
            if (transformControls.mode == 'translate') newMode = '平移'
            else if (transformControls.mode == 'rotate') newMode = '旋转'
            else if (transformControls.mode == 'scale') newMode = '缩放'
        }
        else if (mode == '场景绘制') newMode = '绘制'
        else if (mode == '点击信息') newMode = '预览'

        if (newMode && props.emitEditor.mode !== newMode) {
            props.emitEditor.mode = newMode
        }
    }, 100)
}

onUnmounted(() => {
    if (timer) clearInterval(timer)
    props.emitEditor.threeEditor?.destroySceneRender()
})

props.emitEditor.createScene = createScene

</script>

<style lang="less" scoped>
.threeBox {
    height: 100%;
    width: 100%;
}
</style>
