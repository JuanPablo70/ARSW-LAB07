package edu.eci.arsw.blueprints.test.services;

import edu.eci.arsw.blueprints.filters.impl.RedundancyFiltering;
import edu.eci.arsw.blueprints.filters.impl.SubsamplingFiltering;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;

public class BlueprintFilterTest {

    @Test
    public void redundancyFiltering() {
        RedundancyFiltering rf = new RedundancyFiltering();

        Point[] pts0=new Point[]{new Point(10, 10), new Point(40, 40), new Point(40, 40), new Point(40, 40),new Point(15, 15), new Point(40, 40)};
        Blueprint bp0=new Blueprint("mack", "mypaint", pts0);

        rf.filter(bp0);

        Point[] expected=new Point[]{new Point(10, 10), new Point(40, 40), new Point(15, 15), new Point(40, 40)};

        for (int i = 0; i < expected.length; i++) {
            assertTrue(expected[i].equals(bp0.getPoints().get(i)));
        }
    }

    @Test
    public void subsamplingFiltering() {
        SubsamplingFiltering ssf = new SubsamplingFiltering();

        Point[] pts0=new Point[]{new Point(10, 10), new Point(40, 40), new Point(15, 15), new Point(47, 49), new Point(24, 23)};
        Blueprint bp0=new Blueprint("mack", "mypaint", pts0);

        ssf.filter(bp0);

        Point[] expected=new Point[]{new Point(10, 10), new Point(15, 15), new Point(24, 23)};

        for (int i = 0; i < expected.length; i++) {
            assertTrue(expected[i].equals(bp0.getPoints().get(i)));
        }
    }
}
