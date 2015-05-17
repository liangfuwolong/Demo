package com.test.web.business.dao.impl;


import com.ibatis.sqlmap.client.SqlMapClient;
import com.test.web.business.dao.BaseDAO;
import com.test.web.business.dao.interfaces.ITestTableDAO;
import com.test.web.business.model.TestTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class TestTableDAOImpl extends BaseDAO<TestTable> implements ITestTableDAO {

//    public List getList() {
//        return getSqlMapClientTemplate().queryForList("getAll",null);
//    }
//
//    public TestTable getTest(Integer id) {
//        return (TestTable) this.getSqlMapClientTemplate().queryForObject("selectById", id);
//    }
//
//    public void insert(TestTable test)
//    {
//        getSqlMapClientTemplate().insert("save",test);
//
//    }

    @Autowired
    public TestTableDAOImpl(SqlMapClient sqlMapClient) {
        super(sqlMapClient);
    }
}