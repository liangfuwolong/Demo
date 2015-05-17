package com.test.web.business.dao;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public abstract interface DAOInterface<T>
{
  public abstract Object save(T paramT);

  public abstract int delete(T obj);

  public abstract int deleteById(Serializable id);

  public abstract int alter(T paramT);


  public T findById(Serializable id) ;

  public abstract List<T> findList();

  public abstract List<T> findList(int skip,int max);
}