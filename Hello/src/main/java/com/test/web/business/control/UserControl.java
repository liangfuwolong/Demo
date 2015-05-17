package com.test.web.business.control;

import com.test.web.business.data.BaseRequestData;
import com.test.web.business.model.TestTable;
import com.test.web.business.model.User;
import com.test.web.business.service.interfaces.ITestService;
import com.test.web.business.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Administrator on 2015/5/17.
 */
@Controller
public class UserControl {

    @Autowired
    private IUserService userService;


    @RequestMapping(value="user/save", method = {RequestMethod.POST })
    public @ResponseBody
    boolean insert(Model model,@RequestBody User user){

        getUserService().save(user);
        return true;
    }



    @RequestMapping(value="user/update", method = {RequestMethod.POST })
    public @ResponseBody
    boolean update(Model model,@RequestBody User user){
        getUserService().alter(user);
        return true;
    }

    @RequestMapping(value="user/list", method = {RequestMethod.POST })
    public @ResponseBody List<User> findList(Model model,@RequestBody BaseRequestData data){
        List<User> findList = getUserService().findList(data.getStart(),data.getLimit());
       // System.out.print(findList.get(1).getBirthDay()+"....................");
        return findList;
    }


    public IUserService getUserService() {
        return userService;
    }

    public void setUserService(IUserService userService) {
        this.userService = userService;
    }
}
