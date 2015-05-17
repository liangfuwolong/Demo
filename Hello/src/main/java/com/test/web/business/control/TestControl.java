package com.test.web.business.control;

import com.test.web.business.dao.interfaces.ITestTableDAO;
import com.test.web.business.model.TestTable;
import com.test.web.business.service.interfaces.ITestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Administrator on 2015/5/9.
 */
@Controller
public class TestControl {

    @Autowired
    private ITestService testService;


    @RequestMapping(value="test/vol/{name}")
    public  ModelAndView testVol(@PathVariable String name,ModelMap model){
        model.addAttribute("name", name);
        model.addAttribute("users", getService().findList());
        return new ModelAndView("page1");
    }

    @RequestMapping(value="test/hello")
    public @ResponseBody TestTable test(Model model){
        TestTable test =  getService().findById(1);

        return test;
    }


    @RequestMapping(value="test/list")
    public @ResponseBody List<TestTable> getList(Model model){
        return  getService().findList();
    }
//
//
    @RequestMapping(value="test/save", method = {RequestMethod.POST })
    public @ResponseBody boolean insert(Model model,@RequestBody TestTable testTable){
//        TestTable test = new TestTable();
//        test.setId(2);
//        test.setName("name");
       System.out.print(testTable.getId());
        getService().save(testTable);
        return true;
    }


    public ITestService getService() {
        return testService;
    }

    public void setService(ITestService service) {
        this.testService = service;
    }
}
