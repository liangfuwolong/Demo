package com.test.web.business.service.impl;

import com.test.web.business.dao.DAOInterface;
import com.test.web.business.model.TestTable;
import com.test.web.business.model.User;
import com.test.web.business.service.BaseService;
import com.test.web.business.service.interfaces.ITestService;
import com.test.web.business.service.interfaces.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2015/5/17.
 */
@Service
public class UserServiceImpl extends BaseService<User> implements IUserService {

    @Resource(name="userDAO")
    private  DAOInterface<User> userDao;



    @Override
    protected DAOInterface<User> getDAO() {
        return userDao;
    }
}
