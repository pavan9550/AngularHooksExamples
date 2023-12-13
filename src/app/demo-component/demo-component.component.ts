import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.scss'],
})
export class DemoComponentComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  title: string = 'Demo Component';
  @Input()
  message!: string;

  @ViewChild('temp') tempPara!: ElementRef;

  @ContentChild('temp') paraContent!: ElementRef;

  /*
  WhenEver Angular Application runs and Finds a Component Selector, It will Instantiate new version of the Component.
  InOrder to Instantiate the class "Constructor" is called.
  Note::
  1. Constructor is Not a LifeCycleHook. It is a special Method belongs to JavaScript / TypeScript.

  2. By the time Constructor gets called
     -> Component class will be created and Input Properties are Initialized.
     -> None of the Input Bound Properties are updated.
     -> View is Not Rendered.
     -> Child Components are Not created.

  */
  constructor() {
    console.log('DemoComponent  :: Constructor Called!!!');
    //console.log("By this time, none of the Input Bound Properties are Updated.");
    console.log(`Demo Component :: Title  ${this.title}`);
    console.log(`DemoComponent  :: Constructor :: Message ${this.message}`);
  }

  /*
  Change Detection Cycle::
  ========================
  1. Angular works based on the ChangeDetection Mechanism, by Which Angular kepps  View Template in Sync with the Component class.

  For Example,
 <div> Hello {{name}} </div>

If the Value of "name" changes , It should be reflected in the DOM also.

Q> How Does Angular will know does the Value of "name" Property changed???
A> Angular Runs Change Detection cycle on Every Event happens on the DOM also in  other Scenarios which May result in DOM change.
    Example scenarios::
 -> WhenEver @Input() Property changes
 -> WhenEver DOM event happens. [ Ex: Click Event or ChangeEvent ]
 -> WhenEver a timer Event happens using setTimeOut() / setInterval().
 -> WhenEver an HTTP request is Made.

  */

  /*
  ngOnChanges will be Raised on Below Conditions
  1. When a new Component is Created and Input Properties are updated.
  2. WhenEver there is a change in the Input bound Properties.
  Note::
  3. NgOnChanges will not be raised if changeDetection cycle does not identify any Difference in Previous and Current Value.
  [ whenEver the changeDetection cycle runs, It will compare Current and Previous value of Input property.If there is No change , ngOnChanges will Not Raise. ]

  4.  ngOnChanges will take one Parameter which is of type "SimpleChanges".
  5.  Example of changes Object,
   {"mesasge":{"previousValue":"","currentValue":"Nagesh","firstChange":false}}

   6. SimpleChanges :: A hashtable of changes represented by SimpleChange objects stored at the declared property name they belong to on a Directive or Component. 
                       This is the type passed to the ngOnChanges hook.


   Important Note::
   ===============
   1. ngOnchange will be called, Whenever the Reference of the Input Property changes. [ Not only the Value ].
   2. InCase of String Array , Adding one More Element to the Array using DOM Events will not raise the ngOnChanges Hook
   Becuase String Array Refernce is Not changed.
  */

  ngOnChanges(changes: SimpleChanges) {
    console.log('DemoCommponet :: NgOnChanges Hook Called!!!');
    console.log(`Changes :: ${JSON.stringify(changes)}`);
    console.log(`DemoComponent :: ngOnChanges :: Message ${this.message}`);
  }

  /*
ngOnInIt LifeCycleHook::
===========================

After the Execution of ngOnChanges LifeCycleHook is Completed.

-> ngOnInIt hook gets executed,
   1. After Component is created and Inuput properties are updated.
   2. This hook will raise after ngOnChanges
   3. This Hook is fired only once  i.e, during the First changeDetection cycle.
      After that,if the input properties changes , this hook will not gets executed.
    
  Note::

   4. By the time ngOnInIt gets called,
      None of the ChildComponents / projected Content / Views are Availablbe.
      Hence Any Property decorated with @Viewchild , @ViewChildren , @ContentChild , @ContentChildren will not be available to use.

   5. Perfect place to Make HTTP calls , beacuse it will be executed only once.
*/

  ngOnInit() {
    console.log(`DemoComponent :: ngOnInIt Hook Gets Called!!!`);
    /*
    console.log(`${this.tempPara.nativeElement.value}`);
    The Above Console.log will give "Cant Read Properties of undefined Error". Becuase None of the ChildComponents / projected Content / Views are Availablbe at ngOnInIt.
    */
  }

  /*

  ngOnChanges LifeCycleHook::
===========================

It is Third LifeCyclehook of the Angular which gets called After ngOnchanges and ngOnInit.

-> ngOnChanges hook gets executed,
   1. Invoked During every changeDetection cycle. This hook is Invoked even if there is no change in the input bound Properties.

   Example:  The ngDoCheck lifeCycle hook will run if you clicked a button on webPage, which does not do anyThing, But still it is an event so the changeDetection cycle will run and execute ngDoCheck hook.

   2. Angular invokes ngDoCheck lifeCycle hook after ngOnChanges & ngOnInIt hooks

   Note::
   =====
   3. we can use this hook to implement a custom change detection,
      WhenEver Angular failes to detect any change made to input Bound properties.

   4. The ngDocheck hook is also a great place to use, when you want to execute some code on every changeDetection Cycle.


  */

  /*

   ngDoCheck LifeCycleHook::
===========================

It is Third LifeCyclehook of the Angular which gets called After ngOnchanges and ngOnInit.

-> ngDoCheck hook gets executed,
   1. Invoked During every changeDetection cycle. This hook is Invoked even if there is no change in the input bound Properties.

   Example:  The ngDoCheck lifeCycle hook will run if you clicked a button on webPage, which does not do anyThing, But still it is an event so the changeDetection cycle will run and execute ngDoCheck hook.

   2. Angular invokes ngDoCheck lifeCycle hook after ngOnChanges & ngOnInIt hooks

   3. we can use this hook to implement a custom change detection,
      WhenEver Angular failes to detect any change made to input Bound properties.

   4. The ngDocheck hook is also a great place to use, when you want to execute some code on every changeDetection Cycle.
   */

  ngDoCheck() {
    console.log(`DemoComponent :: ngDoCheck Hook Gets Called!!! `);
    console.log(
      `DemoComponent :: ngDoCheck :: ContentChild :: ${JSON.stringify(
        this.paraContent
      )}`
    );
  }

  /*
  ngAfterContentInit LifeCycle Hook::
====================================

Triggered after "ngDoCheck"

1. After the components projected content has been fully initialized and It is injected into component view.
2. Even if there is "no projected content" , This hook will be called.

3. Angular updates the properties decorated with @Contentchild & @ContentChildren decorator just before this hook is raised.

4. @Contentchild & @ContentChildren used To access a reference of DOM Element / component / Directive from the projected Content.

5. This hook will be called only once , during the first changeDetection cycle. After that, if the projected content changes, this hook will not be called.



  */

  ngAfterContentInit() {
    console.log(`DemoComponent :: ngAfterContentInit Hook Gets Called!!! `);
    console.log(
      `DemoComponent :: ngAfterContentInit :: ContentChild :: ${JSON.stringify(
        this.paraContent.nativeElement.innerHTML
      )}`
    );
  }

  /*

  ngAfterContentChecked LifeCycle Hook::
======================================

ngAfterContentChecked LifeCycleHook gets called,

 1. During Every change detection cycle, After Angular has finished initializing and projecting the content.

2. Angular also updates the properties decorated with @ContentChild & @ContentChildren decorator, before raising ngAfterContentChecked hook.

3. Angular raises this hook even if there is no projected content in the component.

4. ngAfterContentInit hook is called after the projected content is Initialized.
   ngAfterContentChecked is called whenever projected content is Initialized,checked & updated.
   
  */

  ngAfterContentChecked() {
    console.log(`DemoComponent :: ngAfterContentChecked Hook Gets Called!!! `);
    console.log(
      `DemoComponent :: ngAfterContentChecked :: ContentChild :: ${this.tempPara}`
    );
  }

  /*
  Note::  ngAfterContentInit , ngAfterConentChecked are Component only hooks and these are not applicable to Directives.
  */

  /*
  ngAfterViewInit LifeCycleHook::
===============================
1. ngAfterViewInit LifeCycleHook called after ngAfterContentChecked hook.
2. It is called after the Components View template and all its child component view templates are fully initialized.
3. Angular also updates the properties decorated with @ViewChild , @ViewChildren before raising this hook.
4. This also gets called only once , During First changeDetection Cycle. After that if the view changes , It will not gets called.
5.By the time this hook gets called for a component, all the lifeCycle hook methods of the child components and directives are completely processed and child components are completely ready.
  */

  ngAfterViewInit() {
    console.log(`DemoComponent :: ngAfterViewInit Hook Gets Called!!! `);
    console.log(
      `DemoComponent :: ngAfterViewInit :: ContentChild :: ${this.tempPara}`
    );
  }

  /*

  
ngAfterViewChecked LifeCycleHook::
==================================

1. Angular fires ngAfterViewChecked hook after it checks and updates the components view template and all its child components view templates.

2. This hook is called during the first change Detection cycle,after ngAfterViewInit hook has executed. And after that during every change detection cycle.

3. Angular also updates properties decorated with @ViewChild @ViewChildren decorator before raising this hook.

Note:: this is component only hook. Not available for Directives.
  */

  ngAfterViewChecked() {
    console.log(`DemoComponent :: ngAfterViewChecked Hook Gets Called!!! `);
  }

  /*

  Q>  ngDoCheck , ngAfterContentChecked , and  ngAfterViewChecked All these three will raised during
      Every change Detection cycle. What is the Difference among them?

   A> ngDoCheck:: 
       ngDoCheck will detect the change on any Element/Content/View

     ngAfterContentChecked :: 
      ngAfterContentChecked called for each changeDetection cycle, after the projected content has been initilized.
      Those changeDetection cycles which has occured before projected content has been initialized, for those cycles it will not get called.
      Only After ngAfterContentChecked Hook, Updated projected content will be available.
      If need to Compare Current Projected Content with Previous Projected Content, It is possible only in ngAfterContentChecked. It is Not possible in ngDoCheck.


    ngAfterViewChecked:: 
      
      ngAfterViewChecked called for each changeDetection cycle,after the view template of the component/ Its child components are initilized.
      Those changeDetection cycles which has occured before view Template of Component / Its child components Initilized, for those cycles it will not get called.
      Compare the previous View with Current View.

  */

  /*
ngOnDestroy LifeCycle Hook::
============================

1. ngOnDestroy will be called just before the Component/Directive is destroyed.i.e,. Removed From DOM

2.This is Great Place to do some cleanup work like
  -> Unsubscribe from an Observable / detach Event Handler etc.

3. This is the Last lifeCycle Hook of a Component / Directive.

*/

  ngOnDestroy() {
    console.log(`DemoComponent :: ngOnDestroy LifeCycle Hook called!!!`);
  }
}
