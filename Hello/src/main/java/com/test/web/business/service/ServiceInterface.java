package com.test.web.business.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


public abstract interface ServiceInterface<T>
{
  public abstract Object save(T paramT);

  public abstract int delete(T paramT);

  public abstract int deleteById(Serializable paramSerializable);

  public abstract int alter(T paramT);



  public abstract T findById(Serializable paramSerializable);



  public abstract List<T> findList();

  public abstract List<T> findList(int skip,int max);

}