package com.test.web.business.service.impl;

import com.test.web.business.dao.DAOInterface;
import com.test.web.business.model.TestTable;
import com.test.web.business.service.BaseService;
import com.test.web.business.service.interfaces.ITestService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2015/5/16.
 */
@Service
public class TestServiceImpl extends BaseService<TestTable> implements ITestService{

    @Resource(name="testTableDAOImpl")
    private  DAOInterface<TestTable> testTableDao;



    @Override
    protected DAOInterface<TestTable> getDAO() {
        return testTableDao;
    }


}
