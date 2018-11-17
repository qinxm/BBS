import { mapState } from "vuex";
import { getAbsPath, getMapFromArray } from "../utils";

const menuDataMixin = {
    data() {
        return {
            menuData: {
                data: {},
                actionList: [],
                actionMap: false
            },
        }
    },
    computed: {
        ...mapState({
            accessMenuMap(state) {
                // 当前菜单数据map
                return state.menu.accessMenuMap;
            }
        })
    },
    mounted() {
        this.$nextTick(() => {
            const menuData = this.accessMenuMap[this.$route.path] || this.accessMenuMap[getAbsPath(this.$route)];
            if (menuData) {
                this.$set(this.menuData, 'data', menuData)
                if (menuData.actionList) {
                    const list = menuData['actionList']
                    this.$set(this.menuData, 'actionList', list)
                    this.$set(this.menuData, 'actionMap', getMapFromArray({ list }))
                }
            }
        });
    },
}

export default menuDataMixin
