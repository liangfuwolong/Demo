package com.test.web.business.dao.impl;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.test.web.business.dao.BaseDAO;
import com.test.web.business.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2015/5/17.
 */
@Repository
public class UserDAO  extends BaseDAO<User> {
    @Autowired
    public UserDAO(SqlMapClient sqlMapClient) {
        super(sqlMapClient);
    }
}
