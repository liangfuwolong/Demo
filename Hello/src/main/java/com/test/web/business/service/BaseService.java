package com.test.web.business.service;

import com.test.web.business.dao.DAOInterface;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public abstract class BaseService<T>
  implements ServiceInterface<T>
{
  protected abstract DAOInterface<T> getDAO();

  public Object save(T obj)
  {
    return getDAO().save(obj);
  }

  public int delete(T obj)
  {
    return getDAO().delete(obj);
  }

  public int deleteById(Serializable id)
  {
    return getDAO().deleteById(id);
  }

  public int alter(T obj)
  {
    return getDAO().alter(obj);
  }


  public T findById(Serializable id)
  {
    return getDAO().findById(id);
  }


  public List<T> findList()
  {
    return getDAO().findList();
  }

  public List<T> findList(int skip,int max)
  {
    return getDAO().findList(skip,max);
  }

}