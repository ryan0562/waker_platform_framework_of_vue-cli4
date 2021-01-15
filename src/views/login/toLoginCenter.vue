<script>
export default {
  created(){
    const loginUrl = this.$ls.get('SystemUrlMap')[3]
    location.replace(loginUrl)
  }
}
</script>