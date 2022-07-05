<template>
  <div>
    <van-list
      finished-text="--END--"
    >
    <van-col span="24" v-for="item in imgList" :key="item.id">
    <!-- <van-cell v-for="item in imgList" :key="item.id"> -->
      <van-image
        width="100%"
        :src="item.url"
      />
    </van-col>
    <!-- </van-cell> -->
    </van-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgList: [
        {
          id: 1,
          url: 'https://static.maizuo.com/v5/upload/3bc89e2ba260150a97fc96746c9b3000.jpg'
        },
        {
          id: 2,
          url: 'https://static.maizuo.com/v5/upload/0dbf59759aed7ee03091d33448bdb01b.jpg'
        },
        {
          id: 3,
          url: 'https://static.maizuo.com/v5/upload/d9d92408fb06b073e28414d7692407c9.jpg'
        },
        {
          id: 4,
          url: 'https://static.maizuo.com/v5/upload/5729d8af9ff8ca2a4069497b15aa6f23.jpg'
        },
        {
          id: 5,
          url: 'https://static.maizuo.com/v5/upload/da36c8f4736befb08236d2f0aaebf04f.jpg'
        },
        {
          id: 6,
          url: 'https://static.maizuo.com/v5/upload/b08d99f2619ebc073fecb65a309b10a5.jpg'
        },
        {
          id: 7,
          url: 'https://static.maizuo.com/v5/upload/c794bf14470c639435c8a504cdca1056.jpg'
        },
        {
          id: 8,
          url: 'https://static.maizuo.com/v5/upload/0a523a8524d399dfbd1ce69d42802a02.jpg'
        },
        {
          id: 9,
          url: 'https://static.maizuo.com/v5/upload/149e334c6d638e7593168ba197dc510d.jpg'
        }
      ],
      loading: false
    }
  },
  methods: {

  }
}
</script>
