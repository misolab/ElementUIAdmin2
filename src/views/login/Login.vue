<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/images/logo.svg" width="100" height="100" alt="">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-input
          placeholder="User ID"
          suffix-icon="fa fa-user"
          v-model="userNmae"
          style="margin-bottom: 18px"
      >
      </el-input>

      <el-input
          placeholder="Password"
          suffix-icon="fa fa-keyboard-o"
          v-model="password"
          type="password"
          style="margin-bottom: 18px"
          @keyup.native.enter="login"
      >
      </el-input>

      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
      >Login
      </el-button>
      <div>
        <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
        <!-- TODO : 회원가입 절차 -->
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div>

    </div>
  </div>
</template>

<script>
  import {setToken} from '../../utils/dataStorage'
  import {login as loginApi} from '../../api/user'

  export default {
    data() {
      return {
        userNmae: '',
        password: '',
        Remenber: true,
        loginLoading: false
      }
    },
    methods: {
      login(){
        this.loginLoading = true;
        const loginParam = {userId:this.userNmae,pwd:this.password}
        loginApi(loginParam).then(response=>{
          console.log(response);

          this.loginLoading = false;
          const user = response.data.result_body.user;
          setToken(user.name);

          this.$notify({
            title: 'Login',
            message: `안녕하세요 ${user.name} 님`,
            type: 'success'
          });

          this.$router.push({path: '/'});
        }).catch(err=>{
          console.error(err)
          this.loginLoading = false;
          this.$notify({
            title: 'Login',
            message: '실패',
            type: 'warning'
          });
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "Login.scss";
</style>
