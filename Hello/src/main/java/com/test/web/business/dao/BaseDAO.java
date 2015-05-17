package com.test.web.business.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * @className:BaseDAO.java
 * @classDescription:公共DAO，实现对数据库的增删改查
 * @author:wangl
 * @createTime:Jun 16, 2008
 */
public abstract class BaseDAO<T> extends SqlMapClientDaoSupport implements DAOInterface<T>{

	
	private Class<T> clazz;
	private String nameSpace ;
	 @SuppressWarnings("unchecked")
	public BaseDAO() {
	    }

	public BaseDAO(SqlMapClient sqlMapClient) {

		super.setSqlMapClient(sqlMapClient);
		clazz =(Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
		nameSpace =  ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0].toString().split(" ")[1];
	}
	/**
	 * 保存对象
	 * 
	 * @param obj
	 *            要保存的对象
	 * @return 布尔值
	 */
	//@Override
	public Object  save(T obj) {
		System.out.print(obj.getClass().getName());
		return getSqlMapClientTemplate().insert(obj.getClass().getName()+".save", obj);

	}

	/**
	 * 删除对象
	 * 
	 * @param obj
	 *            要删除的对象
	 * @return 布尔值
	 */
	//@Override
	public int delete(T obj) {

		return getSqlMapClientTemplate().delete(nameSpace+".delete", obj);

	}
	/**
	 * 根据Id删除对象
	 * 
	 * @param id
	 *            要删除的对象
	 * @return 布尔值
	 */
	//@Override
	public int deleteById(Serializable id) {
		//System.out.println("=="+id);
		return getSqlMapClientTemplate().delete(nameSpace+".deleteById", id);

	}
	/**
	 * 修改对象
	 * 
	 * @param obj
	 *            要修改的对象
	 * @return 布尔值
	 */
	//@Override
	public int alter(T obj) {

		return getSqlMapClientTemplate().update(nameSpace+".update", obj);

	}

	/**
	 * 根据id查询缓存对象
	 * 
	 * @param id
	 *            类名
	 * @param id
	 *            类id
	 * @return 对象
	 */
	//@Override
	@SuppressWarnings("unchecked")
	public T findById(Serializable id) {

		return (T)getSqlMapClientTemplate().queryForObject(nameSpace+".selectById", id);

	}

	/**
	 * 查询集合
	 * 
	 * @param
	 *
	 * @return 集合
	 */
	//@Override
	@SuppressWarnings("unchecked")
	public List<T> findList() {

		return getSqlMapClientTemplate().queryForList(nameSpace+".getAll", null);

	}



	/**
	 * 查询集合
	 *
	 * @param
	 *
	 * @return 集合
	 */
	//@Override
	@SuppressWarnings("unchecked")
	public List<T> findList(int skip,int max) {
		return getSqlMapClientTemplate().queryForList(nameSpace+".getAll", null,skip,max);

	}

}
